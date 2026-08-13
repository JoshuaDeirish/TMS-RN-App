import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RouteListScreen from '../../Screens/Routes/RouteListScreen';
import RouteDetailsScreen from '../../Screens/Routes/RouteDetailsScreen';
import RouteAddScreen from '../../Screens/Routes/RouteAddScreen';
import RouteEditScreen from '../../Screens/Routes/RouteEditScreen';

const Stack = createStackNavigator();

export default function RoutesStack() {
  return (
    <Stack.Navigator initialRouteName="RouteList" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RouteList" component={RouteListScreen} options={{ title: 'Routes' }} />
      <Stack.Screen name="RouteDetail" component={RouteDetailsScreen} options={{ title: 'Route Details' }} />
      <Stack.Screen name="RouteAdd" component={RouteAddScreen} options={{ title: 'Add Route' }} />
      <Stack.Screen name="RouteEdit" component={RouteEditScreen} options={{ title: 'Edit Route' }} />
    </Stack.Navigator>
  );
}
