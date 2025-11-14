import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../../Screens/Profile/UserProfileScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="UserProfile" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}