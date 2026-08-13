/**
 * The field type system the resource scaffold is built on.
 *
 * A domain describes its fields once, declaratively; these functions turn that
 * description into every behaviour the four screens need - an empty form, a
 * form populated from a record, a validated API payload, and a display string.
 *
 * Keeping all four in one place is the point. When Add, Edit, Details and List
 * each convert values themselves, they drift: a date renders one way on the
 * list and another on the detail screen, or Edit sends "" where Add sends null
 * and only one of them 400s.
 *
 * Types
 * -----
 *   text | email | phone   plain string
 *   textarea               multi-line string
 *   number | money         numeric, sent as a number or null
 *   date                   YYYY-MM-DD (Django DateField)
 *   datetime               YYYY-MM-DD HH:MM, sent as ISO (DateTimeField)
 *   choice                 fixed `options` list
 *   fk                     foreign key, options fetched via `optionsFrom`
 *   boolean                checkbox
 *
 * A field may also set `readOnly: true` to appear on Details but never on a
 * form - useful for server-computed values such as `created_at`.
 */

import {
  toISO, fromISO, toDateOnly, fromDateOnly, formatDate, formatDateTime,
} from "./datetime";

const TEXTUAL = new Set(["text", "email", "phone", "textarea"]);
const NUMERIC = new Set(["number", "money"]);

/** Blank form value for a field, matching the type it will be edited as. */
export function emptyValue(field) {
  if (field.type === "boolean") return false;
  if (field.type === "fk" || field.type === "choice") return null;
  return "";
}

/** Every field's blank value: the initial state of an Add form. */
export function emptyForm(fields) {
  return Object.fromEntries(fields.map((f) => [f.name, emptyValue(f)]));
}

/** An API record -> form state. */
export function toFormState(fields, record) {
  const state = {};

  for (const field of fields) {
    const raw = record?.[field.name];

    if (field.type === "boolean") {
      state[field.name] = Boolean(raw);
    } else if (field.type === "fk" || field.type === "choice") {
      // A choice with a "" default (Django's blank CharField choice) is not a
      // selection; normalise it to null so the picker shows its placeholder.
      state[field.name] = raw === "" || raw === undefined ? null : raw;
    } else if (field.type === "datetime") {
      state[field.name] = fromISO(raw);
    } else if (field.type === "date") {
      state[field.name] = fromDateOnly(raw);
    } else {
      state[field.name] = raw ?? "";
    }
  }

  return state;
}

/**
 * Form state -> {payload} or {errors}.
 *
 * Mirrors the server's own validation rather than replacing it: the API is
 * still the authority and will reject anything this misses. The point is to
 * tell the user immediately instead of after a round trip.
 */
export function buildPayload(fields, form) {
  const errors = {};
  const payload = {};

  for (const field of fields) {
    if (field.readOnly) continue;

    const value = form[field.name];

    if (field.type === "boolean") {
      payload[field.name] = Boolean(value);
      continue;
    }

    if (field.type === "fk" || field.type === "choice") {
      if (field.required && (value === null || value === undefined || value === "")) {
        errors[field.name] = "Required.";
        continue;
      }
      // Django CharField choices reject null but accept ""; FKs are the
      // reverse. Send each the blank it actually accepts.
      const blank = field.type === "choice" ? "" : null;
      payload[field.name] = value === null || value === undefined ? blank : value;
      continue;
    }

    const text = value === null || value === undefined ? "" : String(value).trim();

    if (field.required && !text) {
      errors[field.name] = "Required.";
      continue;
    }

    if (NUMERIC.has(field.type)) {
      if (!text) {
        payload[field.name] = null;
      } else if (Number.isNaN(Number(text))) {
        errors[field.name] = "Must be a number.";
      } else if (Number(text) < 0 && field.allowNegative !== true) {
        errors[field.name] = "Must not be negative.";
      } else {
        payload[field.name] = Number(text);
      }
      continue;
    }

    if (field.type === "datetime") {
      const iso = toISO(text);
      if (iso === undefined) errors[field.name] = "Use YYYY-MM-DD HH:MM";
      else payload[field.name] = iso;
      continue;
    }

    if (field.type === "date") {
      const only = toDateOnly(text);
      if (only === undefined) errors[field.name] = "Use YYYY-MM-DD";
      else payload[field.name] = only;
      continue;
    }

    if (field.type === "email" && text && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(text)) {
      errors[field.name] = "Enter a valid email address.";
      continue;
    }

    payload[field.name] = text;
  }

  if (Object.keys(errors).length) return { errors };
  return { payload };
}

/**
 * A field's value as display text.
 *
 * Prefers the server's readable label when one exists. LoadSerializer and
 * DriverSerializer expose `<field>_name` / `<field>_display` companions
 * alongside raw ids precisely so a list screen never has to resolve a foreign
 * key itself.
 */
export function displayValue(field, record, options) {
  if (!record) return null;

  if (field.display) return field.display(record);

  const label =
    record[`${field.name}_display`] ??
    record[`${field.name}_name`] ??
    (field.labelFrom ? record[field.labelFrom] : undefined);
  if (label !== undefined && label !== null && label !== "") return label;

  const raw = record[field.name];
  if (raw === null || raw === undefined || raw === "") return null;

  if (field.type === "boolean") return raw ? "Yes" : "No";
  if (field.type === "date") return formatDate(raw);
  if (field.type === "datetime") return formatDateTime(raw);
  if (field.type === "money") {
    const n = Number(raw);
    return Number.isNaN(n) ? String(raw) : `$${n.toLocaleString()}`;
  }
  if (field.type === "number") {
    const n = Number(raw);
    const text = Number.isNaN(n) ? String(raw) : n.toLocaleString();
    return field.unit ? `${text} ${field.unit}` : text;
  }

  if (field.type === "choice") {
    const match = (field.options || []).find((o) => String(o.value) === String(raw));
    if (match) return match.label;
  }

  if (field.type === "fk" && options) {
    // Last resort: resolve the id against the options the form already loaded,
    // for endpoints whose serializer has no label companion yet.
    const match = (options[field.name] || []).find((o) => String(o.value) === String(raw));
    if (match) return match.label;
  }

  return String(raw);
}

/** Fields that appear on a form, in section order. */
export function editableFields(fields) {
  return fields.filter((f) => !f.readOnly);
}

/** Which text the search box matches a record against. */
export function searchableText(record, fields, extraKeys = []) {
  const keys = [
    ...fields.filter((f) => TEXTUAL.has(f.type)).map((f) => f.name),
    ...fields.map((f) => `${f.name}_name`),
    ...fields.map((f) => `${f.name}_display`),
    ...extraKeys,
  ];

  return keys
    .map((k) => record[k])
    .filter((v) => v !== null && v !== undefined && v !== "")
    .join(" ")
    .toLowerCase();
}
