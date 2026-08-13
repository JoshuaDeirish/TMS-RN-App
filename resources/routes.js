import { routeAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, MANAGER, OPERATOR, locationField } from "./shared";

export default {
  key: "Route",
  title: "Routes",
  singular: "Route",
  api: routeAPI,
  canCreate: [ADMIN, DISPATCHER, MANAGER, OPERATOR],

  titleOf: (r) => `${r.startLocation_display || "?"} → ${r.endLocation_display || "?"}`,

  listFields: ["distance", "estimatedTime"],

  fields: [
    locationField("startLocation", "Start Location", { required: true }),
    locationField("endLocation", "End Location", { required: true }),
    { name: "distance", label: "Distance", type: "number", unit: "km", required: true },
    {
      name: "estimatedTime", label: "Estimated Time", type: "text", required: true,
      placeholder: "04:30:00",
      help: "Duration as HH:MM:SS.",
    },
  ],
};
