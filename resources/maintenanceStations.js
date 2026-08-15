import { maintenanceStationAPI } from "../api/tmsAPI";
import { ADMIN, SAFETY, MANAGER, locationField } from "./shared";

export default {
  key: "MaintenanceStation",
  title: "Maintenance Stations",
  singular: "Maintenance Station",
  api: maintenanceStationAPI,
  canCreate: [ADMIN, SAFETY, MANAGER],

  titleOf: (m) => m.name,
  subtitleOf: (m) => m.location_display || "",
  badgeOf: (m) => (m.station_type ? { label: m.station_type, tone: "info" } : null),

  listFields: ["station_type", "contact_phone", "contact_email"],

  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "station_type", label: "Station Type", type: "choice", required: true,
      options: [
        { value: "mechanic", label: "Mechanic" },
        { value: "trailer", label: "Trailer Repair" },
        { value: "wash", label: "Wash Bay" },
        { value: "tune", label: "Tune/Inspection" },
        { value: "other", label: "Other" },
      ],
    },
    locationField("location", "Location"),
    { name: "contact_email", label: "Contact Email", type: "email" },
    { name: "contact_phone", label: "Contact Phone", type: "phone" },
    { name: "notes", label: "Notes", type: "textarea" },
  ],
};
