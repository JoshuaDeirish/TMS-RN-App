import { vehicleAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, SAFETY, MANAGER, statusField, driverField, trailerField, isExpired } from "./shared";

/**
 * Trucks.
 *
 * Inspection and insurance expiry drive the badge because Phase 8's assignment
 * validator refuses an out-of-service or lapsed-inspection truck, and dispatch
 * needs the warning before they try.
 */
export default {
  key: "Vehicle",
  title: "Vehicles",
  singular: "Vehicle",
  api: vehicleAPI,
  canCreate: [ADMIN, DISPATCHER, SAFETY, MANAGER],

  titleOf: (v) => v.license_plate,
  subtitleOf: (v) => [v.year, v.make, v.model].filter(Boolean).join(" "),
  badgeOf: (v) => {
    if (isExpired(v.inspection_expiry)) return { label: "Inspection expired", tone: "danger" };
    if (isExpired(v.insurance_expiry)) return { label: "Insurance expired", tone: "danger" };
    if (v.status_code === "out_of_service") return { label: "Out of service", tone: "danger" };
    if (v.status_code === "maintenance") return { label: "Maintenance", tone: "warning" };
    if (v.status_code === "available") return { label: "Available", tone: "success" };
    return v.status_name ? { label: v.status_name, tone: "default" } : null;
  },

  filters: {
    Available: (v) => v.status_code === "available",
    Assigned: (v) => Boolean(v.assigned_driver),
    Maintenance: (v) => v.status_code === "maintenance",
    "Out of Service": (v) => v.status_code === "out_of_service",
    Expiring: (v) => isExpired(v.inspection_expiry) || isExpired(v.insurance_expiry),
  },

  listFields: ["status", "assigned_driver", "mileage_km", "inspection_expiry"],
  searchExtra: ["vin", "driver_name", "status_name"],

  sections: [
    { key: "identity", label: "Identity", fields: ["license_plate", "vin", "make", "model", "year"] },
    { key: "capacity", label: "Capacity & Use", fields: ["capacity_tons", "mileage_km", "engine_hours", "status"] },
    { key: "assignment", label: "Assignment", fields: ["assigned_driver", "assigned_trailer"] },
    { key: "compliance", label: "Insurance & Inspection", fields: ["insurance_provider", "insurance_expiry", "inspection_sticker", "inspection_expiry", "quarterly_inspection_expiry"] },
  ],

  fields: [
    { name: "license_plate", label: "Licence Plate", type: "text", required: true },
    { name: "vin", label: "VIN", type: "text", required: true, autoCapitalize: "characters" },
    { name: "make", label: "Make", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    { name: "year", label: "Year", type: "number", required: true },
    { name: "capacity_tons", label: "Capacity", type: "number", unit: "t", required: true },
    { name: "mileage_km", label: "Mileage", type: "number", unit: "km" },
    { name: "engine_hours", label: "Engine Hours", type: "number", unit: "h" },
    statusField("vehicle"),
    driverField("assigned_driver", "Assigned Driver"),
    trailerField("assigned_trailer", "Assigned Trailer"),
    { name: "insurance_provider", label: "Insurance Provider", type: "text" },
    { name: "insurance_expiry", label: "Insurance Expiry", type: "date" },
    { name: "inspection_sticker", label: "Inspection Sticker", type: "text" },
    { name: "inspection_expiry", label: "Inspection Expiry", type: "date" },
    { name: "quarterly_inspection_expiry", label: "Quarterly Inspection Expiry", type: "date" },
  ],
};
