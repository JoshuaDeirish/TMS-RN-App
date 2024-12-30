import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from './Pages/LoginPage/LoginPage';
import Home from './Pages/Home';
import DriverComponent from './Pages/DriverInfo';
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
import Navbar from './Pages/Navbar/NavBar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Drivers" component={DriverComponent}/>
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

const App = () => {
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
          name="Home"
          component={DrawerNav}
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

export default App;
