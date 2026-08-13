import { maintenanceLogAPI, maintenanceStationAPI, maintenanceTypeAPI } from "../api/tmsAPI";
import { ADMIN, SAFETY, MANAGER, OPERATOR, vehicleField } from "./shared";

export default {
  key: "MaintenanceRecord",
  title: "Maintenance Records",
  singular: "Maintenance Record",
  api: maintenanceLogAPI,
  canCreate: [ADMIN, SAFETY, MANAGER, OPERATOR],

  titleOf: (m) => `${m.vehicle_plate || "Vehicle"} — ${m.maintenance_type_name || "Maintenance"}`,
  subtitleOf: (m) => m.maintenance_station_name || "",
  badgeOf: (m) => (m.cost != null ? { label: `$${Number(m.cost).toLocaleString()}`, tone: "default" } : null),

  listFields: ["vehicle", "maintenance_type", "maintenance_date", "cost"],
  searchExtra: ["vehicle_plate", "maintenance_type_name", "maintenance_station_name"],

  fields: [
    vehicleField("vehicle", "Vehicle", { required: true }),
    {
      name: "maintenance_type", label: "Maintenance Type", type: "fk",
      optionsFrom: { api: maintenanceTypeAPI, label: (t) => t.name },
    },
    {
      name: "maintenance_station", label: "Station", type: "fk",
      optionsFrom: { api: maintenanceStationAPI, label: (s) => s.name },
    },
    { name: "maintenance_date", label: "Date", type: "date", required: true },
    { name: "cost", label: "Cost", type: "money", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
  ],
};
