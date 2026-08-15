import { fuelStationAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, MANAGER, ACCOUNTING, locationField } from "./shared";

export default {
  key: "FuelStation",
  title: "Fuel Stations",
  singular: "Fuel Station",
  api: fuelStationAPI,
  canCreate: [ADMIN, DISPATCHER, MANAGER, ACCOUNTING],

  titleOf: (f) => f.name,
  subtitleOf: (f) => f.location_display || "",

  listFields: ["fuelPrice"],

  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    locationField("location", "Location", { required: true }),
    {
      name: "fuelPrice", label: "Fuel Price", type: "number", required: true,
      help: "Price per litre.",
    },
  ],
};
