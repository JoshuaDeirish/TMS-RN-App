import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../Screens/Settings/SettingsScreen';

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}