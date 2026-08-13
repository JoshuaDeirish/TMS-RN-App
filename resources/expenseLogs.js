import { expenseLogAPI } from "../api/tmsAPI";
import { ADMIN, ACCOUNTING, MANAGER, DRIVER, driverField, vehicleField } from "./shared";

export default {
  key: "ExpenseLog",
  title: "Expense Logs",
  singular: "Expense",
  api: expenseLogAPI,
  canCreate: [ADMIN, ACCOUNTING, MANAGER, DRIVER],

  titleOf: (e) => e.category || `Expense #${e.id}`,
  subtitleOf: (e) => [e.driver_name, e.vehicle_plate].filter(Boolean).join(" — "),
  badgeOf: (e) => (e.amount != null ? { label: `$${Number(e.amount).toLocaleString()}`, tone: "default" } : null),

  listFields: ["category", "amount", "date_incurred", "vehicle"],
  searchExtra: ["driver_name", "vehicle_plate"],

  fields: [
    driverField("driver", "Driver", { required: true }),
    vehicleField("vehicle", "Vehicle"),
    {
      name: "category", label: "Category", type: "text", required: true,
      placeholder: "fuel, repair, toll…",
    },
    { name: "amount", label: "Amount", type: "money", required: true },
    { name: "date_incurred", label: "Date Incurred", type: "date", required: true },
    { name: "notes", label: "Notes", type: "textarea" },
  ],
};
