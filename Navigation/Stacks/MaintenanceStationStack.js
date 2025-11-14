import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaintenanceStationListScreen from '../../Screens/MaintenanceStations/MaintenanceStationListScreen';
import MaintenanceStationDetailsScreen from '../../Screens/MaintenanceStations/MaintenanceStationDetailsScreen';
import MaintenanceStationAddScreen from '../../Screens/MaintenanceStations/MaintenanceStationAddScreen';
import MaintenanceStationEditScreen from '../../Screens/MaintenanceStations/MaintenanceStationEditScreen';

const Stack = createStackNavigator();

export default function MaintenanceStationsStack() {
  return (
    <Stack.Navigator initialRouteName="MaintenanceStationList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="MaintenanceStationList" component={MaintenanceStationListScreen} options={{ title: 'Maintenance Stations' }} />
      <Stack.Screen name="MaintenanceStationDetail" component={MaintenanceStationDetailsScreen} options={{ title: 'Maintenance Station Details' }} />
      <Stack.Screen name="MaintenanceStationAdd" component={MaintenanceStationAddScreen} options={{ title: 'Add Maintenance Station' }} />
      <Stack.Screen name="MaintenanceStationEdit" component={MaintenanceStationEditScreen} options={{ title: 'Edit Maintenance Station' }} />
    </Stack.Navigator>
  );
}