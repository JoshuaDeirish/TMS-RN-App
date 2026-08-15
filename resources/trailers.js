import { trailerAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, SAFETY, MANAGER, statusField, isExpired } from "./shared";

export default {
  key: "Trailer",
  title: "Trailers",
  singular: "Trailer",
  api: trailerAPI,
  canCreate: [ADMIN, DISPATCHER, SAFETY, MANAGER],

  titleOf: (t) => `Trailer ${t.trailer_number}`,
  subtitleOf: (t) => t.type || "",
  badgeOf: (t) => {
    if (isExpired(t.inspection_expiry)) return { label: "Inspection expired", tone: "danger" };
    if (t.status_code === "out_of_service") return { label: "Out of service", tone: "danger" };
    if (t.status_code === "available") return { label: "Available", tone: "success" };
    return t.status_name ? { label: t.status_name, tone: "default" } : null;
  },

  filters: {
    Available: (t) => t.status_code === "available",
    Maintenance: (t) => t.status_code === "maintenance",
    "Out of Service": (t) => t.status_code === "out_of_service",
  },

  listFields: ["type", "status", "capacity_tons", "inspection_expiry"],

  fields: [
    { name: "trailer_number", label: "Trailer Number", type: "text", required: true },
    { name: "type", label: "Type", type: "text", required: true, placeholder: "Dry Van" },
    { name: "capacity_tons", label: "Capacity", type: "number", unit: "t", required: true },
    statusField("trailer"),
    { name: "inspection_expiry", label: "Inspection Expiry", type: "date" },
    { name: "insurance_expiry", label: "Insurance Expiry", type: "date" },
  ],
};
