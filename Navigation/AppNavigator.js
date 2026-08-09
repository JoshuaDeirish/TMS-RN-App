import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useAuth } from '../Services/Context/AuthContext';
import colours from '../styles/colours';

/**
 * Chooses between the signed-out and signed-in navigation trees.
 *
 * Previously the Auth route was commented out and initialRouteName was "Main",
 * so the app opened straight onto the dashboard with no login at all. Swapping
 * whole navigators (rather than navigating between them) means signed-out users
 * have no route to the app's screens - there is no back-stack to escape into.
 */
export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={colours.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.background,
  },
});
