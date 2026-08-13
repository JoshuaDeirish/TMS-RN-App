import { driverAPI } from "../api/tmsAPI";
import { ADMIN, HR, SAFETY, statusField, userField, isExpired } from "./shared";

/**
 * Drivers.
 *
 * Licence expiry is surfaced as a badge because it is the single most
 * consequential field here: Phase 8's assignment validator refuses to dispatch
 * a driver whose licence has lapsed, and dispatch needs to see that coming.
 */
export default {
  key: "Driver",
  title: "Drivers",
  singular: "Driver",
  api: driverAPI,
  canCreate: [ADMIN, HR, SAFETY],

  titleOf: (d) => d.user_name || d.user_email || `Driver #${d.id}`,
  subtitleOf: (d) => (d.license_number ? `Licence ${d.license_number}` : ""),
  badgeOf: (d) => {
    if (isExpired(d.license_expiry)) return { label: "Licence expired", tone: "danger" };
    if (d.status_name) return { label: d.status_name, tone: "default" };
    return null;
  },

  filters: {
    Company: (d) => d.driver_type === "company",
    "Owner Operator": (d) => d.driver_type === "owner_op",
    "Licence Expired": (d) => isExpired(d.license_expiry),
  },

  listFields: ["driver_type", "license_class", "license_expiry", "status"],
  searchExtra: ["user_name", "user_email", "license_number"],

  sections: [
    { key: "person", label: "Person", fields: ["user", "driver_type", "date_hired", "status"] },
    { key: "licence", label: "Licence", fields: ["license_number", "license_class", "license_expiry"] },
  ],

  fields: [
    userField("user", "User Account", {
      required: true,
      help: "A driver is a role attached to an existing user account. Create the account first under Users.",
    }),
    {
      name: "driver_type", label: "Driver Type", type: "choice", required: true,
      options: [
        { value: "company", label: "Company Driver" },
        { value: "owner_op", label: "Owner Operator" },
      ],
    },
    { name: "date_hired", label: "Date Hired", type: "date" },
    statusField("driver"),
    { name: "license_number", label: "Licence Number", type: "text", required: true },
    { name: "license_class", label: "Licence Class", type: "text", placeholder: "AZ" },
    { name: "license_expiry", label: "Licence Expiry", type: "date" },
  ],
};
