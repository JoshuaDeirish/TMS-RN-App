import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DriverListScreen from '../../Screens/Drivers/DriverListScreen';
import DriverDetailsScreen from '../../Screens/Drivers/DriverDetailsScreen';
import DriverAddScreen from '../../Screens/Drivers/DriverAddScreen';
import DriverEditScreen from '../../Screens/Drivers/DriverEditScreen';

const Stack = createStackNavigator();

export default function DriversStack() {
  return (
    <Stack.Navigator initialRouteName="DriverList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverList" component={DriverListScreen} options={{ title: 'Drivers' }} />
      <Stack.Screen name="DriverDetail" component={DriverDetailsScreen} options={{ title: 'Driver Details' }} />
      <Stack.Screen name="DriverAdd" component={DriverAddScreen} options={{ title: 'Add Driver' }} />
      <Stack.Screen name="DriverEdit" component={DriverEditScreen} options={{ title: 'Edit Driver' }} />
    </Stack.Navigator>
  );
}
