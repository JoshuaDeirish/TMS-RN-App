import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import SelectField from "../../Components/SelectField";
import ScreenState from "../../Components/ScreenState";
import VerticalTabs from "../../Components/VerticalTabs";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import {
  clientAPI, locationAPI, statusAPI, vehicleAPI, trailerAPI, asArray,
} from "../../api/tmsAPI";
import input from "../../styles/input";
import colours from "../../styles/colours";
import typography from "../../styles/typography";

export const EQUIPMENT_OPTIONS = [
  { value: "dry_van", label: "Dry Van" },
  { value: "reefer", label: "Reefer" },
  { value: "flatbed", label: "Flatbed" },
  { value: "step_deck", label: "Step Deck" },
  { value: "tanker", label: "Tanker" },
  { value: "other", label: "Other" },
];

export const EMPTY_LOAD = {
  reference: "", client: null, status: null,
  origin: null, destination: null,
  commodity: "", required_equipment: "",
  weight_kg: "", distance_km: "", rate: "",
  pickup_time: "", expected_delivery: "",
  assigned_vehicle: null, trailer: null,
  notes: "",
};

/** "2026-09-01 14:30" (or an ISO string) -> ISO, or null when blank. */
export function toISO(text) {
  if (!text || !String(text).trim()) return null;
  const normalised = String(text).trim().replace(" ", "T");
  const d = new Date(normalised);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

/** ISO -> "YYYY-MM-DD HH:MM" for editing. */
export function fromISO(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const numeric = (v) => (v === "" || v == null ? null : Number(v));

/**
 * Turns form state into the payload the API expects, or returns validation
 * errors. Kept next to the form so Add and Edit cannot drift apart.
 */
export function buildPayload(form) {
  const errors = {};

  if (!form.origin) errors.origin = "Required.";
  if (!form.destination) errors.destination = "Required.";

  const pickup = toISO(form.pickup_time);
  const delivery = toISO(form.expected_delivery);
  if (pickup === undefined) errors.pickup_time = "Use YYYY-MM-DD HH:MM";
  if (delivery === undefined) errors.expected_delivery = "Use YYYY-MM-DD HH:MM";
  if (pickup && delivery && new Date(delivery) < new Date(pickup)) {
    errors.expected_delivery = "Delivery cannot be before pickup.";
  }

  for (const field of ["weight_kg", "distance_km", "rate"]) {
    const raw = form[field];
    if (raw !== "" && raw != null) {
      if (Number.isNaN(Number(raw))) errors[field] = "Must be a number.";
      else if (Number(raw) < 0) errors[field] = "Must not be negative.";
    }
  }

  if (Object.keys(errors).length) return { errors };

  return {
    payload: {
      reference: form.reference || "",
      client: form.client ?? null,
      status: form.status ?? null,
      origin: form.origin,
      destination: form.destination,
      commodity: form.commodity || "",
      required_equipment: form.required_equipment || "",
      weight_kg: numeric(form.weight_kg),
      distance_km: numeric(form.distance_km),
      rate: numeric(form.rate),
      pickup_time: pickup,
      expected_delivery: delivery,
      assigned_vehicle: form.assigned_vehicle ?? null,
      trailer: form.trailer ?? null,
      notes: form.notes || "",
    },
  };
}

/** Shared field layout for LoadAddScreen and LoadEditScreen. */
export default function LoadForm({ form, setForm, fieldErrors = {} }) {
  const [tab, setTab] = useState("route");
  const [refs, setRefs] = useState({ clients: [], locations: [], statuses: [], vehicles: [], trailers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const loadRefs = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      // Reference lists load together; a failure in any one leaves the form
      // unusable, so surface it rather than rendering empty pickers.
      const [clients, locations, statuses, vehicles, trailers] = await Promise.all([
        clientAPI.list().then(asArray).catch(() => []),
        locationAPI.list().then(asArray),
        statusAPI.list().then(asArray).catch(() => []),
        vehicleAPI.list().then(asArray).catch(() => []),
        trailerAPI.list().then(asArray).catch(() => []),
      ]);
      setRefs({ clients, locations, statuses, vehicles, trailers });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadRefs(); }, [loadRefs]);

  const locationOptions = refs.locations.map((l) => ({
    value: l.id, label: `${l.city}, ${l.state} — ${l.address_line}`,
  }));
  const clientOptions = refs.clients.map((c) => ({ value: c.id, label: c.name }));
  const statusOptions = refs.statuses
    .filter((s) => !s.category || s.category === "shipment")
    .map((s) => ({ value: s.id, label: s.name }));
  const vehicleOptions = refs.vehicles.map((v) => ({
    value: v.id, label: `${v.license_plate} — ${v.make} ${v.model}`,
  }));
  const trailerOptions = refs.trailers.map((t) => ({
    value: t.id, label: `${t.trailer_number} (${t.type})`,
  }));

  const Field = ({ label, name, ...props }) => (
    <View style={styles.field}>
      <Text style={[typography.detail.label, styles.label]}>{label}</Text>
      <TextInput
        style={[input.input, fieldErrors[name] && styles.inputError]}
        placeholderTextColor={colours.textMuted}
        value={String(form[name] ?? "")}
        onChangeText={(v) => update(name, v)}
        {...props}
      />
      {fieldErrors[name] ? <Text style={styles.errorText}>{fieldErrors[name]}</Text> : null}
    </View>
  );

  return (
    <ScreenState loading={loading} error={error} onRetry={loadRefs}>
      <TwoColumnLayout
        leftContent={
          <VerticalTabs
            active={tab}
            onChange={setTab}
            tabs={[
              { key: "route", label: "Route & Timing" },
              { key: "freight", label: "Freight" },
              { key: "commercial", label: "Commercial" },
              { key: "assignment", label: "Assignment" },
            ]}
          />
        }
        rightContent={
          <>
            {tab === "route" && (
              <View>
                <SelectField
                  label="Origin *" value={form.origin} options={locationOptions}
                  onChange={(v) => update("origin", v)} allowClear={false}
                  error={fieldErrors.origin}
                />
                <SelectField
                  label="Destination *" value={form.destination} options={locationOptions}
                  onChange={(v) => update("destination", v)} allowClear={false}
                  error={fieldErrors.destination}
                />
                <Field label="Pickup (YYYY-MM-DD HH:MM)" name="pickup_time" placeholder="2026-09-01 08:00" />
                <Field label="Expected Delivery (YYYY-MM-DD HH:MM)" name="expected_delivery" placeholder="2026-09-02 16:00" />
                <SelectField
                  label="Status" value={form.status} options={statusOptions}
                  onChange={(v) => update("status", v)}
                  placeholder={statusOptions.length ? "Select…" : "No shipment statuses defined"}
                />
              </View>
            )}

            {tab === "freight" && (
              <View>
                <Field label="Commodity" name="commodity" placeholder="Palletized auto parts" />
                <SelectField
                  label="Required Equipment" value={form.required_equipment}
                  options={EQUIPMENT_OPTIONS} onChange={(v) => update("required_equipment", v || "")}
                />
                <Field label="Weight (kg)" name="weight_kg" placeholder="18500" keyboardType="numeric" />
                <Field label="Distance (km)" name="distance_km" placeholder="130.5" keyboardType="numeric" />
              </View>
            )}

            {tab === "commercial" && (
              <View>
                <Field label="Reference" name="reference" placeholder="TMS-1042" />
                <SelectField
                  label="Client" value={form.client} options={clientOptions}
                  onChange={(v) => update("client", v)}
                  placeholder={clientOptions.length ? "Select…" : "No clients available"}
                />
                <Field label="Rate (CAD)" name="rate" placeholder="1450.00" keyboardType="numeric" />
                <Field
                  label="Notes" name="notes" placeholder="Anything dispatch should know"
                  multiline numberOfLines={4}
                  style={[input.input, styles.multiline]}
                />
              </View>
            )}

            {tab === "assignment" && (
              <View>
                <Text style={[typography.text.muted, styles.hint]}>
                  Leave these empty to keep the load in the unassigned queue.
                </Text>
                <SelectField
                  label="Vehicle" value={form.assigned_vehicle} options={vehicleOptions}
                  onChange={(v) => update("assigned_vehicle", v)}
                  placeholder={vehicleOptions.length ? "Select…" : "No vehicles available"}
                />
                <SelectField
                  label="Trailer" value={form.trailer} options={trailerOptions}
                  onChange={(v) => update("trailer", v)}
                  placeholder={trailerOptions.length ? "Select…" : "No trailers available"}
                />
              </View>
            )}
          </>
        }
      />
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 4 },
  label: { marginBottom: 4, marginLeft: 4 },
  inputError: { borderColor: colours.danger, borderWidth: 1 },
  errorText: { color: colours.danger, fontSize: 12, marginLeft: 4, marginBottom: 6 },
  multiline: { height: 100, textAlignVertical: "top", paddingTop: 12 },
  hint: { marginBottom: 16 },
});
