import { warehouseAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, MANAGER, OPERATOR, locationField } from "./shared";

export default {
  key: "Warehouse",
  title: "Warehouses",
  singular: "Warehouse",
  api: warehouseAPI,
  canCreate: [ADMIN, DISPATCHER, MANAGER, OPERATOR],

  titleOf: (w) => w.location_display || `Warehouse #${w.id}`,
  badgeOf: (w) => (w.facility_type ? { label: w.facility_type, tone: "info" } : null),

  listFields: ["facility_type", "ship_type"],

  fields: [
    locationField("location", "Location", { required: true }),
    {
      name: "facility_type", label: "Facility Type", type: "choice", required: true,
      options: [
        { value: "warehouse", label: "Warehouse" },
        { value: "factory", label: "Factory" },
      ],
    },
    {
      name: "ship_type", label: "Ship Type", type: "choice", required: true,
      options: [
        { value: "receiver", label: "Receiver" },
        { value: "shipper", label: "Shipper" },
        { value: "both", label: "Both" },
      ],
    },
  ],
};
