import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import stack navigators
import DashboardStack from './Stacks/DashboardStack';
import ClientStack from './Stacks/ClientStack';
import ContractStack from './Stacks/ContractStack';
import DocumentStack from './Stacks/DocumentStack';
import ExpenseLogStack from './Stacks/ExpenseLogStack';
import FuelLogStack from './Stacks/FuelLogStack';
import FuelStationStack from './Stacks/FuelStationStack';
import InvoiceStack from './Stacks/InvoiceStack';
import LoadStack from './Stacks/LoadStack';
import LocationStack from './Stacks/LocationStack';
import MaintenanceRecordStack from './Stacks/MaintenanceRecordStack';
import MaintenanceStationStack from './Stacks/MaintenanceStationStack';
import NotificationStack from './Stacks/NotificationStack';
import ProfileStack from './Stacks/ProfileStack';
import SettingsStack from './Stacks/SettingsStack';
import TrailerStack from './Stacks/TrailerStack';
import TripStack from './Stacks/TripStack';
import VehicleStack from './Stacks/VehicleStack';
import WarehouseStack from './Stacks/WarehouseStack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Clients" component={ClientStack} />
      <Drawer.Screen name="Contracts" component={ContractStack} />
      <Drawer.Screen name="Documents" component={DocumentStack} />
      <Drawer.Screen name="Expense Logs" component={ExpenseLogStack} />
      <Drawer.Screen name="Fuel Logs" component={FuelLogStack} />
      <Drawer.Screen name="Fuel Stations" component={FuelStationStack} />
      <Drawer.Screen name="Invoices" component={InvoiceStack} />
      <Drawer.Screen name="Loads" component={LoadStack} />
      <Drawer.Screen name="Locations" component={LocationStack} />
      <Drawer.Screen name="Maintenance Records" component={MaintenanceRecordStack} />
      <Drawer.Screen name="Maintenance Stations" component={MaintenanceStationStack} />
      <Drawer.Screen name="Notifications" component={NotificationStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Trailers" component={TrailerStack} />
      <Drawer.Screen name="Trips" component={TripStack} />
      <Drawer.Screen name="Vehicles" component={VehicleStack} />
      <Drawer.Screen name="Warehouses" component={WarehouseStack} />
    </Drawer.Navigator>
  );
}
