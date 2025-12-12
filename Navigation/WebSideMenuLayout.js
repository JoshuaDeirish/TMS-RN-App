// navigation/WebSideMenuLayout.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-web';
// Stacks
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
import VehiclesStack from './Stacks/VehicleStack';
import WarehouseStack from './Stacks/WarehouseStack';
import StyleGuideScreen from '../Screens/Settings/StyleGuide';
import colours from '../styles/colours';

// Menu array
const SCREENS = [
  { name: 'Dashboard', component: DashboardStack },
  { name: 'Clients', component: ClientStack },
  { name: 'Contracts', component: ContractStack },
  { name: 'Documents', component: DocumentStack },
  { name: 'Expense Logs', component: ExpenseLogStack },
  { name: 'Fuel Logs', component: FuelLogStack },
  { name: 'Fuel Stations', component: FuelStationStack },
  { name: 'Invoices', component: InvoiceStack },
  { name: 'Loads', component: LoadStack },
  { name: 'Locations', component: LocationStack },
  { name: 'Maintenance Logs', component: MaintenanceRecordStack },
  { name: 'Maintenance Stations', component: MaintenanceStationStack },
  { name: 'Notifications', component: NotificationStack },
  { name: 'Profile', component: ProfileStack },
  { name: 'Settings', component: SettingsStack },
  { name: 'Style Guide', component: StyleGuideScreen },
  { name: 'Trailers', component: TrailerStack },
  { name: 'Trips', component: TripStack },
  { name: 'Vehicles', component: VehiclesStack },
  { name: 'Warehouses', component: WarehouseStack },
  
];


const Stack = createStackNavigator();

export default function WebSideMenuLayout() {
  const [activeScreen, setActiveScreen] = useState('Vehicles');
  const ActiveComponent = SCREENS.find(screen => screen.name === activeScreen).component;

  return (
    <View style={styles.container}>
      {/* Side Menu */}
      <View style={styles.sideMenu}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TMS</Text>
        </View>
        <View style={{ flex: 1 }} contentContainerStyle={styles.menuList}>
          {SCREENS.map(screen => (
            <TouchableOpacity
              key={screen.name}
              style={[styles.menuItem, activeScreen === screen.name && styles.activeMenuItem]}
              onPress={() => setActiveScreen(screen.name)}
            >
              <Text style={styles.menuText}>{screen.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      {/* Active View */}
      <View style={styles.content}>
    <Stack.Navigator >
      <Stack.Screen
        name={activeScreen}
        component={ActiveComponent}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sideMenu: {
    width: 350,
    backgroundColor: '#2c2929ff',
    paddingVertical: 10,
    padding: 16,
    height: '100vh',  
    overflow: 'scroll',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    padding: 12,
    paddingLeft: 16,
  },
  activeMenuItem: {
    backgroundColor: '#2e4bddff',
    borderRadius: 8,
  },
  menuText: {
    fontSize: 20,
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
});
