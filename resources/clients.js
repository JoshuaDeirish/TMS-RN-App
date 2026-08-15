import { clientAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, MANAGER, ACCOUNTING, statusField, locationField } from "./shared";

/** Mirrors ClientViewSet.write_roles in tms_core/views.py. */
export default {
  key: "Client",
  title: "Clients",
  singular: "Client",
  api: clientAPI,
  canCreate: [ADMIN, DISPATCHER, MANAGER, ACCOUNTING],

  titleOf: (c) => c.name,
  subtitleOf: (c) => c.email || "",
  badgeOf: (c) => (c.client_type ? { label: c.client_type === "broker" ? "Broker" : "Shipper", tone: "info" } : null),

  filters: {
    Shippers: (c) => c.client_type === "shipper",
    Brokers: (c) => c.client_type === "broker",
  },

  listFields: ["client_type", "email", "phone_number"],

  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "client_type", label: "Type", type: "choice", required: true,
      options: [
        { value: "shipper", label: "Shipper" },
        { value: "broker", label: "Broker" },
      ],
    },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone_number", label: "Phone", type: "phone", required: true },
    locationField("location", "Location"),
    statusField("client"),
  ],
};
