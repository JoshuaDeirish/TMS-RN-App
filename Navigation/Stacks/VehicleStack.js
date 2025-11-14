// navigation/stacks/VehiclesStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import VehicleListScreen from '../../Screens/Vehicles/VehicleListScreen';
import VehicleDetailsScreen from '../../Screens/Vehicles/VehicleDetailsScreen';
import VehicleAddScreen from '../../Screens/Vehicles/VehicleAddScreen';
import VehicleEditScreen from '../../Screens/Vehicles/VehicleEditScreen';

const Stack = createStackNavigator();

export default function VehiclesStack() {
  return (
    <Stack.Navigator initialRouteName='VehicleList' screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="VehicleList" component={VehicleListScreen} options={{ title: 'Vehicles' }} />
      <Stack.Screen name="VehicleDetail" component={VehicleDetailsScreen} options={{ title: 'Vehicle Details' }} />
      <Stack.Screen name="VehicleEdit" component={VehicleEditScreen} options={{ title: 'Edit Vehicle' }} />
      <Stack.Screen name="VehicleAdd" component={VehicleAddScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
