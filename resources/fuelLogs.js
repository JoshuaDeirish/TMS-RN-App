import { fuelLogAPI } from "../api/tmsAPI";
import { ADMIN, ACCOUNTING, MANAGER, DRIVER, driverField, vehicleField } from "./shared";

export default {
  key: "FuelLog",
  title: "Fuel Logs",
  singular: "Fuel Log",
  api: fuelLogAPI,
  canCreate: [ADMIN, ACCOUNTING, MANAGER, DRIVER],

  titleOf: (f) => `${f.vehicle_plate || "Vehicle"} — ${f.fuel_amount_litres ?? "?"} L`,
  subtitleOf: (f) => f.driver_name || "",

  listFields: ["vehicle", "fuel_amount_litres", "cost", "date_logged"],
  searchExtra: ["vehicle_plate", "driver_name"],

  fields: [
    vehicleField("vehicle", "Vehicle", { required: true }),
    driverField("driver", "Driver"),
    { name: "fuel_amount_litres", label: "Fuel Amount", type: "number", unit: "L", required: true },
    { name: "cost", label: "Cost", type: "money", required: true },
    {
      name: "currency", label: "Currency", type: "choice",
      options: [
        { value: "CAD", label: "CAD" },
        { value: "USD", label: "USD" },
      ],
    },
    { name: "date_logged", label: "Logged", type: "datetime", readOnly: true },
  ],
};
