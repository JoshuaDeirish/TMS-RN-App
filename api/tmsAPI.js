/**
 * One CRUD client per TMS endpoint, all built from the same factory.
 * Import what you need:  import { loadAPI, clientAPI } from "../../api/tmsAPI";
 */
import { createResourceApi } from "./resource";

// Workforce
export const userAPI = createResourceApi("users");
export const driverAPI = createResourceApi("drivers");
export const scheduleAPI = createResourceApi("schedules");
export const userDeadlineAPI = createResourceApi("user-deadlines");

// Commercial
export const clientAPI = createResourceApi("clients");
export const contractAPI = createResourceApi("contracts");
export const invoiceAPI = createResourceApi("invoices");

// Reference data
export const statusAPI = createResourceApi("statuses");
export const locationAPI = createResourceApi("locations");
export const routeAPI = createResourceApi("routes");
export const warehouseAPI = createResourceApi("warehouses");
export const fuelStationAPI = createResourceApi("fuel-stations");
export const maintenanceStationAPI = createResourceApi("maintenance-stations");
export const maintenanceTypeAPI = createResourceApi("maintenance-types");

// Fleet
export const vehicleAPI = createResourceApi("vehicles");
export const trailerAPI = createResourceApi("trailers");
export const maintenanceLogAPI = createResourceApi("maintenance-logs");

// Operations
export const loadAPI = createResourceApi("loads");
export const tripAPI = createResourceApi("trips");
export const loadScheduleAPI = createResourceApi("load-schedules");
export const trackingEventAPI = createResourceApi("tracking-events");
export const locationPingAPI = createResourceApi("location-pings");

// Money
export const fuelLogAPI = createResourceApi("fuel-logs");
export const payLogAPI = createResourceApi("pay-logs");
export const expenseLogAPI = createResourceApi("expense-logs");
export const tripExpenseLogAPI = createResourceApi("trip-expense-logs");
export const vehicleExpenseLogAPI = createResourceApi("vehicle-expense-logs");

// Documents and notifications
export const documentAPI = createResourceApi("documents");
export const notificationAPI = createResourceApi("notification-logs");

export { asArray } from "./resource";
