import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfileScreen from '../../Screens/Profile/UserProfileScreen';
import UserProfileEditScreen from '../../Screens/Profile/UserProfileEditScreen';
import ChangePasswordScreen from '../../Screens/Profile/ChangePasswordScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="UserProfile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="UserProfileEdit" component={UserProfileEditScreen} options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
    </Stack.Navigator>
  );
}
