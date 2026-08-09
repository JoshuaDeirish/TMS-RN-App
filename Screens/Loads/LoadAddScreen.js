import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenHeader from "../../Components/ScreenHeader";
import LoadForm, { EMPTY_LOAD, buildPayload } from "./LoadForm";
import { loadAPI } from "../../api/tmsAPI";
import layout from "../../styles/layout";
import colours from "../../styles/colours";

export default function LoadAddScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState(EMPTY_LOAD);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [saving, setSaving] = useState(false);

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
      const created = await loadAPI.create(payload);
      navigation.navigate("LoadDetail", { id: created.id });
    } catch (err) {
      // DRF returns {field: ["message"]} for validation failures; surface those
      // against the fields rather than as one opaque banner.
      const data = err?.fieldErrors;
      if (data && typeof data === "object" && !Array.isArray(data)) {
        setFieldErrors(
          Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.join(" ") : String(v)])
          )
        );
      }
      setSubmitError(err?.message || "Could not create the load.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title={saving ? "Saving…" : "Add Load"}
        backText="Loads"
        onBack={() => navigation.navigate("LoadList")}
        onSave={handleSave}
      />

      {submitError ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{submitError}</Text>
        </View>
      ) : null}

      <LoadForm form={form} setForm={setForm} fieldErrors={fieldErrors} />
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
