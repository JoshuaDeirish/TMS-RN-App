import React, { useState, useEffect, useCallback } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import ScreenHeader from "../../Components/ScreenHeader";
import ScreenState from "../../Components/ScreenState";
import LoadForm, { EMPTY_LOAD, buildPayload, fromISO } from "./LoadForm";
import { loadAPI } from "../../api/tmsAPI";
import layout from "../../styles/layout";
import colours from "../../styles/colours";

/** API record -> form state (nulls become "", datetimes become editable text). */
function toFormState(load) {
  return {
    ...EMPTY_LOAD,
    reference: load.reference ?? "",
    client: load.client ?? null,
    status: load.status ?? null,
    origin: load.origin ?? null,
    destination: load.destination ?? null,
    commodity: load.commodity ?? "",
    required_equipment: load.required_equipment ?? "",
    weight_kg: load.weight_kg ?? "",
    distance_km: load.distance_km ?? "",
    rate: load.rate ?? "",
    pickup_time: fromISO(load.pickup_time),
    expected_delivery: fromISO(load.expected_delivery),
    assigned_vehicle: load.assigned_vehicle ?? null,
    trailer: load.trailer ?? null,
    notes: load.notes ?? "",
  };
}

export default function LoadEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id ?? route.params?.item?.id;

  const [form, setForm] = useState(EMPTY_LOAD);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchLoad = useCallback(async () => {
    setLoadError(null);
    setLoading(true);
    try {
      setForm(toFormState(await loadAPI.get(id)));
    } catch (err) {
      setLoadError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchLoad();
    else {
      setLoadError({ message: "No load was specified." });
      setLoading(false);
    }
  }, [id, fetchLoad]);

  const handleSave = async () => {
    if (saving) return;

    setSubmitError(null);
    const { payload, errors } = buildPayload(form);
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSaving(true);

    try {
      await loadAPI.patch(id, payload);
      navigation.navigate("LoadDetail", { id });
    } catch (err) {
      const data = err?.fieldErrors;
      if (data && typeof data === "object" && !Array.isArray(data)) {
        setFieldErrors(
          Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.join(" ") : String(v)])
          )
        );
      }
      setSubmitError(err?.message || "Could not save the load.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title={saving ? "Saving…" : "Edit Load"}
        backText="Load"
        onBack={() => navigation.navigate("LoadDetail", { id })}
        onSave={handleSave}
      />

      {submitError ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{submitError}</Text>
        </View>
      ) : null}

      <ScreenState loading={loading} error={loadError} onRetry={fetchLoad}>
        <LoadForm form={form} setForm={setForm} fieldErrors={fieldErrors} />
      </ScreenState>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "rgba(255,82,82,0.15)",
    borderLeftWidth: 3,
    borderLeftColor: colours.danger,
    padding: 12,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 6,
  },
  bannerText: { color: colours.danger },
});
