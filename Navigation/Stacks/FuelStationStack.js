import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FuelStationListScreen from '../../Screens/FuelStations/FuelStationListScreen';
import FuelStationDetailsScreen from '../../Screens/FuelStations/FuelStationDetailsScreen';
import FuelStationAddScreen from '../../Screens/FuelStations/FuelStationAddScreen';
import FuelStationEditScreen from '../../Screens/FuelStations/FuelStationEditScreen';

const Stack = createStackNavigator();

export default function FuelStationsStack() {
  return (
    <Stack.Navigator initialRouteName="FuelStationList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="FuelStationList" component={FuelStationListScreen} options={{ title: 'Fuel Stations' }} />
      <Stack.Screen name="FuelStationDetail" component={FuelStationDetailsScreen} options={{ title: 'Fuel Station Details' }} />
      <Stack.Screen name="FuelStationAdd" component={FuelStationAddScreen} options={{ title: 'Add Fuel Station' }} />
      <Stack.Screen name="FuelStationEdit" component={FuelStationEditScreen} options={{ title: 'Edit Fuel Station' }} />
    </Stack.Navigator>
  );
}