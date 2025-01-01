import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Pages
import LoginPage from './Pages/LoginPage/LoginPage';
import Dashboard from './Pages/Dashboard';
import OperatorComponent from './Pages/DriverInfo';
import ShipmentsComponent from './Pages/Shipments';
import ShipmentViewComponent from './Pages/ShipmentView';
import ClientComponent from './Pages/Clients';
import OrderComponent from './Pages/Orders';
import FuelLogComponent from './Pages/ServiceStationPages/FuelLogs';
import FuelLogViewComponent from './Pages/ServiceStationPages/FuelLogView';
import AddFuelLogComponent from './Pages/ServiceStationPages/AddFuelLog';
import MaintenanceRecordComponent from './Pages/ServiceStationPages/MaintenanceRecords';
import MaintenanceRecordViewComponent from './Pages/ServiceStationPages/MaintenanceRecordView';
import AddMaintenanceRecordComponent from './Pages/ServiceStationPages/AddMaintenanceRecord';
import FuelStationsComponent from './Pages/ServiceStationPages/FuelStations';
import FuelStationViewComponent from './Pages/ServiceStationPages/FuelStationView';
import AddFuelStationComponent from './Pages/ServiceStationPages/AddFuelStation';
import MaintenanceStationsComponent from './Pages/ServiceStationPages/MaintenanceStations';
import MaintenanceStationViewComponent from './Pages/ServiceStationPages/MaintenanceStationView';
import AddMaintenanceStationComponent from './Pages/ServiceStationPages/AddMaintenanceStation';
import VehiclesComponent from './Pages/VehiclePages/Vehicles';
import VehicleViewComponent from './Pages/VehiclePages/VehicleView';
import AddVehicleComponent from './Pages/VehiclePages/AddVehicle';

// Navigation Setup
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigation for Mobile
const DrawerNav = () => (
  <Drawer.Navigator initialRouteName="Dashboard" drawerType="permanent">
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="Operators" component={OperatorComponent} />
    <Drawer.Screen name="Clients" component={ClientComponent} />
    <Drawer.Screen name="Orders" component={OrderComponent} />
    <Drawer.Screen name="Shipments" component={ShipmentsComponent} />
    <Drawer.Screen name="Vehicles" component={VehiclesComponent} />
    <Drawer.Screen name="Fuel Stations" component={FuelStationsComponent} />
    <Drawer.Screen name="Fuel Logs" component={FuelLogComponent} />
    <Drawer.Screen name="Maintenance Stations" component={MaintenanceStationsComponent} />
    <Drawer.Screen name="Maintenance Records" component={MaintenanceRecordComponent} />
  </Drawer.Navigator>
);

// Web Side Menu Layout
const WebSideMenuLayout = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const screens = [
    { name: 'Dashboard', component: Dashboard },
    { name: 'Operators', component: OperatorComponent },
    { name: 'Clients', component: ClientComponent },
    { name: 'Orders', component: OrderComponent },
    { name: 'Shipments', component: ShipmentsComponent },
    { name: 'Vehicles', component: VehiclesComponent },
    { name: 'Fuel Stations', component: FuelStationsComponent },
    { name: 'Fuel Logs', component: FuelLogComponent },
    { name: 'Maintenance Stations', component: MaintenanceStationsComponent },
    { name: 'Maintenance Records', component: MaintenanceRecordComponent },
  ];

  const ActiveComponent = screens.find(screen => screen.name === activeScreen).component;

  return (
    <View style={styles.webContainer}>
      {/* Side Menu (Persistent) */}
      <View style={styles.sideMenu}>
        {screens.map(screen => (
          <TouchableOpacity
            key={screen.name}
            style={[
              styles.menuItem,
              activeScreen === screen.name && styles.activeMenuItem,
            ]}
            onPress={() => setActiveScreen(screen.name)}
          >
            <Text style={styles.menuText}>{screen.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Active Screen */}
      <View style={styles.activeScreen}>
        <ActiveComponent />
      </View>
    </View>
  );
};

// Main App Component
const App = () => {
  const isWeb = Platform.OS === 'web';
  const screenWidth = Dimensions.get('window').width;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        {/* Authentication */}
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />

        {/* Main Navigation */}
        <Stack.Screen
          name="Dashboard"
          component={isWeb && screenWidth > 768 ? WebSideMenuLayout : DrawerNav}
          options={{ headerShown: false }}
        />

        {/* Shipments */}
        <Stack.Screen
          name="ShipmentViewComponent"
          component={ShipmentViewComponent}
          options={{ title: 'Shipment Details' }}
        />

        {/* Vehicle Pages */}
        <Stack.Screen
          name="VehicleViewComponent"
          component={VehicleViewComponent}
          options={{ title: 'Vehicle Details' }}
        />
        <Stack.Screen
          name="AddVehicleComponent"
          component={AddVehicleComponent}
          options={{ title: 'Add Vehicle' }}
        />

        {/* Service Station Pages */}
        <Stack.Screen
          name="FuelLogViewComponent"
          component={FuelLogViewComponent}
          options={{ title: 'Fuel Log Details' }}
        />
        <Stack.Screen
          name="AddFuelLogComponent"
          component={AddFuelLogComponent}
          options={{ title: 'Add Fuel Log' }}
        />
        <Stack.Screen
          name="MaintenanceRecordViewComponent"
          component={MaintenanceRecordViewComponent}
          options={{ title: 'Maintenance Record Details' }}
        />
        <Stack.Screen
          name="AddMaintenanceRecordComponent"
          component={AddMaintenanceRecordComponent}
          options={{ title: 'Add Maintenance Record' }}
        />
        <Stack.Screen
          name="FuelStationViewComponent"
          component={FuelStationViewComponent}
          options={{ title: 'Fuel Station Details' }}
        />
        <Stack.Screen
          name="AddFuelStationComponent"
          component={AddFuelStationComponent}
          options={{ title: 'Add Fuel Station' }}
        />
        <Stack.Screen
          name="MaintenanceStationViewComponent"
          component={MaintenanceStationViewComponent}
          options={{ title: 'Maintenance Station Details' }}
        />
        <Stack.Screen
          name="AddMaintenanceStationComponent"
          component={AddMaintenanceStationComponent}
          options={{ title: 'Add Maintenance Station' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sideMenu: {
    width: 250,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  menuItem: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeMenuItem: {
    backgroundColor: '#007bff',
  },
  menuText: {
    color: '#333',
  },
  activeScreen: {
    flex: 1,
    padding: 10,
  },
});

export default App;
