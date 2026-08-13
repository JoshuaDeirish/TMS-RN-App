import { locationAPI } from "../api/tmsAPI";
import { ADMIN, DISPATCHER, MANAGER, OPERATOR } from "./shared";

export default {
  key: "Location",
  title: "Locations",
  singular: "Location",
  api: locationAPI,
  canCreate: [ADMIN, DISPATCHER, MANAGER, OPERATOR],

  titleOf: (l) => `${l.city}, ${l.state}`,
  subtitleOf: (l) => l.address_line,

  listFields: ["address_line", "postal_code", "country"],

  sections: [
    { key: "address", label: "Address", fields: ["address_line", "city", "state", "postal_code", "country"] },
    {
      key: "coords", label: "Coordinates",
      description: "Optional. Used for mapping and distance estimates.",
      fields: ["latitude", "longitude"],
    },
  ],

  fields: [
    { name: "address_line", label: "Address", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "postal_code", label: "Postal Code", type: "text", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "latitude", label: "Latitude", type: "number", allowNegative: true },
    { name: "longitude", label: "Longitude", type: "number", allowNegative: true },
  ],
};
