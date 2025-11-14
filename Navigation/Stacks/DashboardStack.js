import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import DashboardListScreen from '../../Screens/Dashboard/DashboardListScreen';


const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator initialRouteName="DashboardList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="DashboardList" component={DashboardListScreen} options={{ title: 'Dashboard' }} />
    </Stack.Navigator>
  );
}
