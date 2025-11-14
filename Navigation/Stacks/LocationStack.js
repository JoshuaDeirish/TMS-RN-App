import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationListScreen from '../../Screens/Locations/LocationListScreen';
import LocationDetailsScreen from '../../Screens/Locations/LocationDetailsScreen';
import LocationAddScreen from '../../Screens/Locations/LocationAddScreen';
import LocationEditScreen from '../../Screens/Locations/LocationEditScreen';

const Stack = createStackNavigator();

export default function LocationsStack() {
  return (
    <Stack.Navigator initialRouteName="LocationList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="LocationList" component={LocationListScreen} options={{ title: 'Locations' }} />
      <Stack.Screen name="LocationDetail" component={LocationDetailsScreen} options={{ title: 'Location Details' }} />
      <Stack.Screen name="LocationAdd" component={LocationAddScreen} options={{ title: 'Add Location' }} />
      <Stack.Screen name="LocationEdit" component={LocationEditScreen} options={{ title: 'Edit Location' }} />
    </Stack.Navigator>
  );
}