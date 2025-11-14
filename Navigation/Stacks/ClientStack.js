import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import ClientListScreen from '../../Screens/Clients/ClientListScreen';
import ClientDetailsScreen from '../../Screens/Clients/ClientDetailsScreen';
import ClientAddScreen from '../../Screens/Clients/ClientAddScreen';
import ClientEditScreen from '../../Screens/Clients/ClientEditScreen';

const Stack = createStackNavigator();

export default function ClientsStack() {
  return (
    <Stack.Navigator initialRouteName="ClientList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="ClientList" component={ClientListScreen} options={{ title: '' }} />
      <Stack.Screen name="ClientDetail" component={ClientDetailsScreen} options={{ title: 'Client Details' }} />
      <Stack.Screen name="ClientAdd" component={ClientAddScreen} options={{ title: 'Add Client' }} />
      <Stack.Screen name="ClientEdit" component={ClientEditScreen} options={{ title: 'Edit Client' }} />
    </Stack.Navigator>
  );
}
