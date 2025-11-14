import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FuelLogListScreen from '../../Screens/FuelLogs/FuelLogListScreen';
import FuelLogDetailsScreen from '../../Screens/FuelLogs/FuelLogDetailsScreen';
import FuelLogAddScreen from '../../Screens/FuelLogs/FuelLogAddScreen';
import FuelLogEditScreen from '../../Screens/FuelLogs/FuelLogEditScreen';

const Stack = createStackNavigator();

export default function FuelLogsStack() {
  return (
    <Stack.Navigator initialRouteName="FuelLogList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="FuelLogList" component={FuelLogListScreen} options={{ title: 'Fuel Logs' }} />
      <Stack.Screen name="FuelLogDetail" component={FuelLogDetailsScreen} options={{ title: 'Fuel Log Details' }} />
      <Stack.Screen name="FuelLogAdd" component={FuelLogAddScreen} options={{ title: 'Add Fuel Log' }} />
      <Stack.Screen name="FuelLogEdit" component={FuelLogEditScreen} options={{ title: 'Edit Fuel Log' }} />
    </Stack.Navigator>
  );
}