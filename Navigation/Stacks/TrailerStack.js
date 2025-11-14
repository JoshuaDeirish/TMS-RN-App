import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrailerListScreen from '../../Screens/Trailers/TrailerListScreen';
import TrailerDetailsScreen from '../../Screens/Trailers/TrailerDetailsScreen';
import TrailerAddScreen from '../../Screens/Trailers/TrailerAddScreen';
import TrailerEditScreen from '../../Screens/Trailers/TrailerEditScreen';

const Stack = createStackNavigator();

export default function TrailersStack() {
  return (
    <Stack.Navigator initialRouteName="TrailerList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="TrailerList" component={TrailerListScreen} options={{ title: 'Trailers' }} />
      <Stack.Screen name="TrailerDetail" component={TrailerDetailsScreen} options={{ title: 'Trailer Details' }} />
      <Stack.Screen name="TrailerAdd" component={TrailerAddScreen} options={{ title: 'Add Trailer' }} />
      <Stack.Screen name="TrailerEdit" component={TrailerEditScreen} options={{ title: 'Edit Trailer' }} />
    </Stack.Navigator>
  );
}