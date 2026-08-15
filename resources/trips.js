import { tripAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, MANAGER, statusField, driverField, vehicleField, trailerField } from "./shared";

export default {
  key: "Trip",
  title: "Trips",
  singular: "Trip",
  api: tripAPI,
  canCreate: [ADMIN, DISPATCHER, MANAGER],

  titleOf: (t) => `Trip #${t.id}`,
  subtitleOf: (t) => [t.driver_name, t.vehicle_plate].filter(Boolean).join(" — "),
  badgeOf: (t) => {
    const tone = { active: "success", planned: "info", completed: "default", cancelled: "danger" }[t.status_code];
    return t.status_name ? { label: t.status_name, tone: tone || "default" } : null;
  },

  filters: {
    Planned: (t) => t.status_code === "planned",
    Active: (t) => t.status_code === "active",
    Completed: (t) => t.status_code === "completed",
  },

  listFields: ["driver", "vehicle", "start_time", "end_time"],
  searchExtra: ["driver_name", "vehicle_plate", "status_name"],

  sections: [
    { key: "assignment", label: "Assignment", fields: ["driver", "vehicle", "trailer", "status"] },
    { key: "timing", label: "Timing", fields: ["start_time", "end_time"] },
    { key: "notes", label: "Notes", fields: ["notes"] },
  ],

  fields: [
    driverField("driver", "Driver"),
    vehicleField("vehicle", "Vehicle"),
    trailerField("trailer", "Trailer"),
    statusField("trip"),
    { name: "start_time", label: "Start Time", type: "datetime" },
    { name: "end_time", label: "End Time", type: "datetime" },
    { name: "notes", label: "Notes", type: "textarea" },
  ],
};
