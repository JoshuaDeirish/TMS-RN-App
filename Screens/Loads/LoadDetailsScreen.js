import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import ScreenHeader from "../../Components/ScreenHeader";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import DetailsList from "../../Components/DetailsList";
import ScreenState from "../../Components/ScreenState";
import { loadAPI } from "../../api/tmsAPI";
import { useAuth } from "../../Services/Context/AuthContext";
import layout from "../../styles/layout";
import buttons from "../../styles/buttons";
import colours from "../../styles/colours";
import typography from "../../styles/typography";

const CAN_EDIT = ["admin", "dispatcher", "manager"];

const money = (v) => (v == null || v === "" ? "—" : `$${Number(v).toLocaleString()}`);
const num = (v, unit) => (v == null || v === "" ? "—" : `${Number(v).toLocaleString()} ${unit}`);
const dateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
};

export default function LoadDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { role } = useAuth();

  // Accept either an id or a whole item, so links from other screens can pass
  // whichever they have. The record is always refetched to stay current.
  const id = route.params?.id ?? route.params?.item?.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchLoad = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      setItem(await loadAPI.get(id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      if (id) fetchLoad();
      else {
        setError({ message: "No load was specified." });
        setLoading(false);
      }
    }, [id, fetchLoad])
  );

  const confirmDelete = () => {
    const doDelete = async () => {
      setDeleting(true);
      try {
        await loadAPI.remove(id);
        navigation.navigate("LoadList");
      } catch (err) {
        setError(err);
      } finally {
        setDeleting(false);
      }
    };

    // Alert.alert has no effect on react-native-web, so fall back to confirm().
    if (typeof window !== "undefined" && window.confirm) {
      if (window.confirm("Delete this load? This cannot be undone.")) doDelete();
      return;
    }
    Alert.alert("Delete load", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: doDelete },
    ]);
  };

  const canEdit = CAN_EDIT.includes(role);

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title={item?.reference ? `Load ${item.reference}` : "Load Details"}
        backText="Loads"
        onBack={() => navigation.navigate("LoadList")}
      />

      <ScreenState loading={loading} error={error} onRetry={fetchLoad}>
        {item ? (
          <TwoColumnLayout
            leftContent={
              <View style={styles.leftBox}>
                <View
                  style={[
                    styles.statusChip,
                    item.assigned_vehicle ? styles.chipAssigned : styles.chipUnassigned,
                  ]}
                >
                  <Text style={styles.chipText}>
                    {item.assigned_vehicle ? "ASSIGNED" : "UNASSIGNED"}
                  </Text>
                </View>

                <Text style={[typography.text.muted, styles.routeLabel]}>Route</Text>
                <Text style={styles.routeText}>{item.origin_display || "—"}</Text>
                <Text style={styles.routeArrow}>↓</Text>
                <Text style={styles.routeText}>{item.destination_display || "—"}</Text>

                {canEdit ? (
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={buttons.primary}
                      onPress={() => navigation.navigate("LoadEdit", { id: item.id })}
                    >
                      <Text style={buttons.primaryText}>Edit Load</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[buttons.secondary, styles.deleteButton]}
                      onPress={confirmDelete}
                      disabled={deleting}
                    >
                      <Text style={styles.deleteText}>
                        {deleting ? "Deleting…" : "Delete Load"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            }
            rightContent={
              <DetailsList
                data={[
                  { label: "Reference", value: item.reference || "—" },
                  { label: "Client", value: item.client_name || "—" },
                  { label: "Status", value: item.status_name || "—" },
                  { label: "Commodity", value: item.commodity || "—" },
                  { label: "Required Equipment", value: item.equipment_display || "—" },
                  { label: "Weight", value: num(item.weight_kg, "kg") },
                  { label: "Distance", value: num(item.distance_km, "km") },
                  { label: "Rate", value: money(item.rate) },
                  { label: "Pickup", value: dateTime(item.pickup_time) },
                  { label: "Expected Delivery", value: dateTime(item.expected_delivery) },
                  { label: "Delivered At", value: dateTime(item.delivered_at) },
                  { label: "Assigned Vehicle", value: item.vehicle_plate || "Not assigned" },
                  { label: "Assigned Trailer", value: item.trailer_number || "Not assigned" },
                  { label: "Driver", value: item.driver_name || "Not assigned" },
                  { label: "Notes", value: item.notes || "—" },
                ]}
              />
            }
          />
        ) : null}
      </ScreenState>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  leftBox: { flex: 1, width: "100%" },
  statusChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  chipAssigned: { backgroundColor: colours.success },
  chipUnassigned: { backgroundColor: colours.warning },
  chipText: { color: "#0d0d0d", fontWeight: "700", fontSize: 11, letterSpacing: 1 },

  routeLabel: { marginBottom: 6 },
  routeText: { color: colours.textPrimary, fontSize: 15, fontWeight: "600" },
  routeArrow: { color: colours.textMuted, fontSize: 16, marginVertical: 4 },

  buttonGroup: { width: "100%", marginTop: 28, gap: 12 },
  deleteButton: { borderColor: colours.danger, borderWidth: 1 },
  deleteText: { color: colours.danger, textAlign: "center", fontWeight: "600" },
});
