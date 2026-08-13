/**
 * Pieces shared across resource configs.
 *
 * Role constants and status-category filters live here so nineteen configs
 * cannot disagree about who may write to what, or about which Status rows
 * belong in which picker.
 */

import { statusAPI, locationAPI, userAPI, driverAPI, vehicleAPI, trailerAPI, loadAPI, clientAPI } from "../api/tmsAPI";

export const ADMIN = "admin";
export const DISPATCHER = "dispatcher";
export const HR = "hr";
export const SAFETY = "safety and compliance";
export const OPERATOR = "operator";
export const MANAGER = "manager";
export const ACCOUNTING = "accounting";
export const DRIVER = "driver";

/**
 * A Status picker limited to one category.
 *
 * Status is a single shared lookup table, so an unfiltered picker would offer
 * "Delivered" as a vehicle status. The category filter mirrors the
 * limit_choices_to declared on the model.
 */
export const statusField = (category, opts = {}) => ({
  name: "status",
  label: "Status",
  type: "fk",
  optionsFrom: {
    api: statusAPI,
    filter: (s) => s.category === category,
    label: (s) => s.name,
  },
  emptyText: `No ${category} statuses defined`,
  ...opts,
});

export const locationField = (name = "location", label = "Location", opts = {}) => ({
  name,
  label,
  type: "fk",
  optionsFrom: {
    api: locationAPI,
    label: (l) => `${l.city}, ${l.state} — ${l.address_line}`,
  },
  ...opts,
});

export const driverField = (name = "driver", label = "Driver", opts = {}) => ({
  name,
  label,
  type: "fk",
  optionsFrom: {
    api: driverAPI,
    label: (d) => d.user_name || d.license_number || `Driver #${d.id}`,
  },
  ...opts,
});

export const vehicleField = (name = "vehicle", label = "Vehicle", opts = {}) => ({
  name,
  label,
  type: "fk",
  optionsFrom: {
    api: vehicleAPI,
    label: (v) => `${v.license_plate} — ${v.make} ${v.model}`,
  },
  ...opts,
});

export const trailerField = (name = "trailer", label = "Trailer", opts = {}) => ({
  name,
  label,
  type: "fk",
  optionsFrom: {
    api: trailerAPI,
    label: (t) => `${t.trailer_number} (${t.type})`,
  },
  ...opts,
});

export const loadField = (name = "load", label = "Load", opts = {}) => ({
  name,
  label,
  type: "fk",
  optionsFrom: {
    api: loadAPI,
    label: (l) => l.reference || `Load #${l.id}`,
  },
  ...opts,
});

export const clientField = (name = "client", label = "Client", opts = {}) => ({
  name,
  label,
  type: "fk",
  optionsFrom: { api: clientAPI, label: (c) => c.name },
  ...opts,
});

export const userField = (name = "user", label = "User", opts = {}) => ({
  name,
  label,
  type: "fk",
  optionsFrom: {
    api: userAPI,
    label: (u) => `${[u.first_name, u.last_name].filter(Boolean).join(" ") || u.email}`,
  },
  // Non-admin/HR roles only ever see their own user record, so this picker is
  // legitimately near-empty for them rather than broken.
  emptyText: "No users available to you",
  ...opts,
});

/**
 * Whether a date is in the past - used for expiry badges.
 *
 * Compared in UTC against the date parts only, so a licence does not appear
 * expired for a few hours because of the viewer's timezone.
 */
export function isExpired(value) {
  if (!value) return false;
  const text = String(value).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const today = new Date();
  const todayUTC = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, "0")}-${String(today.getUTCDate()).padStart(2, "0")}`;
  return text < todayUTC;
}
