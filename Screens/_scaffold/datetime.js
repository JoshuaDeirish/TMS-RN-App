/**
 * Date and time conversion between the API and editable text.
 *
 * The API speaks ISO 8601 (and plain YYYY-MM-DD for DateFields). People do
 * not, so every form edits a friendlier string and converts at the boundary.
 * One implementation, used by the scaffold and re-exported by LoadForm, so the
 * two cannot drift.
 *
 * The convention throughout: `undefined` means "the user typed something I
 * could not parse" and `null` means "the field is empty". Callers rely on that
 * difference to tell a validation error from a blank optional field.
 */

const pad = (n) => String(n).padStart(2, "0");

/** "2026-09-01 14:30" (or an ISO string) -> ISO. null if blank, undefined if unparseable. */
export function toISO(text) {
  if (!text || !String(text).trim()) return null;
  const d = new Date(String(text).trim().replace(" ", "T"));
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

/** ISO -> "YYYY-MM-DD HH:MM" for editing. */
export function fromISO(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * "2026-09-01" -> "2026-09-01" for a DateField.
 *
 * Deliberately not routed through `new Date()`: parsing a bare date string
 * applies the local timezone, which shifts the day backwards for anyone west
 * of UTC and would silently change a licence expiry date.
 */
export function toDateOnly(text) {
  if (!text || !String(text).trim()) return null;
  const value = String(text).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;

  const [y, m, d] = value.split("-").map(Number);
  const probe = new Date(Date.UTC(y, m - 1, d));
  const valid =
    probe.getUTCFullYear() === y &&
    probe.getUTCMonth() === m - 1 &&
    probe.getUTCDate() === d;

  return valid ? value : undefined;
}

/** API date value -> "YYYY-MM-DD" for editing. */
export function fromDateOnly(value) {
  if (!value) return "";
  const text = String(value);
  return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : "";
}

// --- Read-only display ------------------------------------------------------

export function formatDate(value) {
  if (!value) return null;
  // Bare dates are rendered from their parts for the same timezone reason as
  // toDateOnly: "2026-09-01" must not display as 31 August.
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
    const [y, m, d] = String(value).split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(undefined, {
      month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
    });
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateTime(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleString(undefined, {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
}
