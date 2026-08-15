/**
 * Which navigation sections each role may see.
 *
 * This MIRRORS the backend `read_roles` declared in tms_core/views.py. It is a
 * convenience only - hiding a menu item is not a security control. The Django
 * API is the authority and rejects anything this list gets wrong, so if the two
 * ever disagree the user sees a section that simply returns 403.
 *
 * Keep this file in sync when you change read_roles on the server.
 */

import DashboardStack from './Stacks/DashboardStack';
import ClientStack from './Stacks/ClientStack';
import ContractStack from './Stacks/ContractStack';
import DocumentStack from './Stacks/DocumentStack';
import DriverStack from './Stacks/DriverStack';
import ExpenseLogStack from './Stacks/ExpenseLogStack';
import FuelLogStack from './Stacks/FuelLogStack';
import FuelStationStack from './Stacks/FuelStationStack';
import InvoiceStack from './Stacks/InvoiceStack';
import LoadStack from './Stacks/LoadStack';
import LocationStack from './Stacks/LocationStack';
import MaintenanceRecordStack from './Stacks/MaintenanceRecordStack';
import MaintenanceStationStack from './Stacks/MaintenanceStationStack';
import NotificationStack from './Stacks/NotificationStack';
import RouteStack from './Stacks/RouteStack';
import ProfileStack from './Stacks/ProfileStack';
import SettingsStack from './Stacks/SettingsStack';
import TrailerStack from './Stacks/TrailerStack';
import TripStack from './Stacks/TripStack';
import VehicleStack from './Stacks/VehicleStack';
import WarehouseStack from './Stacks/WarehouseStack';
import StyleGuideScreen from '../Screens/Settings/StyleGuide';

export const ADMIN = 'admin';
export const DISPATCHER = 'dispatcher';
export const HR = 'hr';
export const SAFETY = 'safety and compliance';
export const OPERATOR = 'operator';
export const MANAGER = 'manager';
export const ACCOUNTING = 'accounting';
export const DRIVER = 'driver';

export const ALL_ROLES = [ADMIN, DISPATCHER, HR, SAFETY, OPERATOR, MANAGER, ACCOUNTING, DRIVER];

/** `roles: null` means "every signed-in role". */
export const SECTIONS = [
  { name: 'Dashboard',            component: DashboardStack,           roles: null },
  { name: 'Loads',                component: LoadStack,                roles: null },
  { name: 'Trips',                component: TripStack,                roles: null },
  { name: 'Routes',               component: RouteStack,               roles: null },
  { name: 'Vehicles',             component: VehicleStack,             roles: null },
  { name: 'Trailers',             component: TrailerStack,             roles: null },
  { name: 'Locations',            component: LocationStack,            roles: null },
  { name: 'Warehouses',           component: WarehouseStack,           roles: null },
  { name: 'Documents',            component: DocumentStack,            roles: null },
  { name: 'Notifications',        component: NotificationStack,        roles: null },
  { name: 'Maintenance Records',  component: MaintenanceRecordStack,   roles: null },
  { name: 'Maintenance Stations', component: MaintenanceStationStack,  roles: null },
  { name: 'Fuel Stations',        component: FuelStationStack,         roles: null },

  { name: 'Drivers',      component: DriverStack,
    roles: [ADMIN, DISPATCHER, HR, SAFETY, OPERATOR, MANAGER, ACCOUNTING, DRIVER] },

  { name: 'Fuel Logs',    component: FuelLogStack,
    roles: [ADMIN, ACCOUNTING, MANAGER, DISPATCHER, OPERATOR, DRIVER] },
  { name: 'Expense Logs', component: ExpenseLogStack,
    roles: [ADMIN, ACCOUNTING, MANAGER, DISPATCHER, DRIVER] },
  { name: 'Clients',      component: ClientStack,
    roles: [ADMIN, DISPATCHER, MANAGER, ACCOUNTING, OPERATOR] },
  { name: 'Contracts',    component: ContractStack,
    roles: [ADMIN, MANAGER, ACCOUNTING] },
  { name: 'Invoices',     component: InvoiceStack,
    roles: [ADMIN, ACCOUNTING, MANAGER] },

  { name: 'Profile',  component: ProfileStack,  roles: null },
  { name: 'Settings', component: SettingsStack, roles: null },

  // Developer reference, not an operational screen.
  { name: 'Style Guide', component: StyleGuideScreen, roles: [ADMIN] },
];

/** Sections visible to a given role. Unknown/absent role sees nothing. */
export function sectionsForRole(role) {
  if (!role) return [];
  return SECTIONS.filter((s) => s.roles === null || s.roles.includes(role));
}
