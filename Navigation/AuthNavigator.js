import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// This import was commented out, leaving `LoginScreen` undefined - rendering
// this navigator would have thrown a ReferenceError. Note the capital S in
// "Screens": the original comment pointed at a lowercase path that does not
// exist on a case-sensitive filesystem.
import LoginScreen from '../Screens/Auth/LoginScreen';
import ResetPasswordScreen from '../Screens/Auth/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
