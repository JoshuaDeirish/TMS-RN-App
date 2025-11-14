import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationListScreen from '../../Screens/Notifications/NotificationListScreen';


const Stack = createStackNavigator();

export default function NotificationsStack() {
  return (
    <Stack.Navigator initialRouteName="NotificationList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="NotificationList" component={NotificationListScreen}  />
    </Stack.Navigator>
  );
}