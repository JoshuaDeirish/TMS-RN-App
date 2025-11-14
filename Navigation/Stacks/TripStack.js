import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TripListScreen from '../../Screens/Trips/TripListScreen';
import TripDetailsScreen from '../../Screens/Trips/TripDetailsScreen';
import TripAddScreen from '../../Screens/Trips/TripAddScreen';
import TripEditScreen from '../../Screens/Trips/TripEditScreen';

const Stack = createStackNavigator();

export default function TripsStack() {
  return (
    <Stack.Navigator initialRouteName="TripList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="TripList" component={TripListScreen} options={{ title: 'Trips' }} />
      <Stack.Screen name="TripDetail" component={TripDetailsScreen} options={{ title: 'Trip Details' }} />
      <Stack.Screen name="TripAdd" component={TripAddScreen} options={{ title: 'Add Trip' }} />
      <Stack.Screen name="TripEdit" component={TripEditScreen} options={{ title: 'Edit Trip' }} />
    </Stack.Navigator>
  );
}