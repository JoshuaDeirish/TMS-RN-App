import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import SelectField from "../../Components/SelectField";
import ScreenState from "../../Components/ScreenState";
import VerticalTabs from "../../Components/VerticalTabs";
import TwoColumnLayout from "../../Components/TwoColumnLayout";
import {
  clientAPI, locationAPI, statusAPI, vehicleAPI, trailerAPI, driverAPI,
} from "../../api/tmsAPI";
import { toISO } from "../_scaffold/datetime";
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
  assigned_vehicle: null, assigned_driver: null, trailer: null,
  notes: "",
};

// Re-exported so LoadAddScreen/LoadEditScreen keep importing them from here,
// while there is only one implementation (shared with the resource scaffold).
export { toISO, fromISO } from "../_scaffold/datetime";

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
      assigned_driver: form.assigned_driver ?? null,
      trailer: form.trailer ?? null,
      notes: form.notes || "",
    },
  };
}

/**
 * A single text field.
 *
 * Module level, not inside LoadForm. When a component is declared inside
 * another component's body React sees a new component *type* on every render
 * and unmounts/remounts the subtree - so the TextInput lost focus after each
 * keystroke, which on a phone also dismissed the keyboard every character.
 */
function TextField({ label, name, form, errors, onChange, ...props }) {
  const error = errors[name];
  return (
    <View style={styles.field}>
      <Text style={[typography.detail.label, styles.label]}>{label}</Text>
      <TextInput
        style={[input.input, error && styles.inputError]}
        placeholderTextColor={colours.textMuted}
        value={String(form[name] ?? "")}
        onChangeText={(v) => onChange(name, v)}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

/** Shared field layout for LoadAddScreen and LoadEditScreen. */
export default function LoadForm({ form, setForm, fieldErrors = {} }) {
  const [tab, setTab] = useState("route");
  const [refs, setRefs] = useState({
    clients: [], locations: [], statuses: [], vehicles: [], trailers: [], drivers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const loadRefs = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      // listAll(), not list(): the API pages every endpoint, and a picker that
      // silently stops at the first page looks exactly like a complete one.
      //
      // Reference lists load together; a failure in any one leaves the form
      // unusable, so surface it rather than rendering empty pickers.
      const [clients, locations, statuses, vehicles, trailers, drivers] = await Promise.all([
        clientAPI.listAll().catch(() => []),
        locationAPI.listAll(),
        statusAPI.listAll().catch(() => []),
        vehicleAPI.listAll().catch(() => []),
        trailerAPI.listAll().catch(() => []),
        driverAPI.listAll().catch(() => []),
      ]);
      setRefs({ clients, locations, statuses, vehicles, trailers, drivers });
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
  const driverOptions = refs.drivers.map((d) => ({
    value: d.id,
    label: d.license_class
      ? `${d.user_name || `Driver #${d.id}`} — ${d.license_class}`
      : (d.user_name || `Driver #${d.id}`),
  }));

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
                <TextField form={form} errors={fieldErrors} onChange={update} label="Pickup (YYYY-MM-DD HH:MM)" name="pickup_time" placeholder="2026-09-01 08:00" />
                <TextField form={form} errors={fieldErrors} onChange={update} label="Expected Delivery (YYYY-MM-DD HH:MM)" name="expected_delivery" placeholder="2026-09-02 16:00" />
                <SelectField
                  label="Status" value={form.status} options={statusOptions}
                  onChange={(v) => update("status", v)}
                  placeholder={statusOptions.length ? "Select…" : "No shipment statuses defined"}
                />
              </View>
            )}

            {tab === "freight" && (
              <View>
                <TextField form={form} errors={fieldErrors} onChange={update} label="Commodity" name="commodity" placeholder="Palletized auto parts" />
                <SelectField
                  label="Required Equipment" value={form.required_equipment}
                  options={EQUIPMENT_OPTIONS} onChange={(v) => update("required_equipment", v || "")}
                />
                <TextField form={form} errors={fieldErrors} onChange={update} label="Weight (kg)" name="weight_kg" placeholder="18500" keyboardType="numeric" />
                <TextField form={form} errors={fieldErrors} onChange={update} label="Distance (km)" name="distance_km" placeholder="130.5" keyboardType="numeric" />
              </View>
            )}

            {tab === "commercial" && (
              <View>
                <TextField form={form} errors={fieldErrors} onChange={update} label="Reference" name="reference" placeholder="TMS-1042" />
                <SelectField
                  label="Client" value={form.client} options={clientOptions}
                  onChange={(v) => update("client", v)}
                  placeholder={clientOptions.length ? "Select…" : "No clients available"}
                />
                <TextField form={form} errors={fieldErrors} onChange={update} label="Rate (CAD)" name="rate" placeholder="1450.00" keyboardType="numeric" />
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
                  Leave these empty to keep the load in the unassigned queue. Naming
                  the driver here records who ran the freight, so reassigning the
                  truck later does not rewrite that history.
                </Text>
                <SelectField
                  label="Vehicle" value={form.assigned_vehicle} options={vehicleOptions}
                  onChange={(v) => update("assigned_vehicle", v)}
                  placeholder={vehicleOptions.length ? "Select…" : "No vehicles available"}
                />
                <SelectField
                  label="Driver" value={form.assigned_driver} options={driverOptions}
                  onChange={(v) => update("assigned_driver", v)}
                  placeholder={driverOptions.length ? "Select…" : "No drivers available"}
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
