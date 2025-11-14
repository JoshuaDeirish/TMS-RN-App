import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoadListScreen from '../../Screens/Loads/LoadListScreen';
import LoadDetailsScreen from '../../Screens/Loads/LoadDetailsScreen';
import LoadAddScreen from '../../Screens/Loads/LoadAddScreen';
import LoadEditScreen from '../../Screens/Loads/LoadEditScreen';

const Stack = createStackNavigator();

export default function LoadsStack() {
  return (
    <Stack.Navigator initialRouteName="LoadList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="LoadList" component={LoadListScreen} options={{ title: 'Loads' }} />
      <Stack.Screen name="LoadDetail" component={LoadDetailsScreen} options={{ title: 'Load Details' }} />
      <Stack.Screen name="LoadAdd" component={LoadAddScreen} options={{ title: 'Add Load' }} />
      <Stack.Screen name="LoadEdit" component={LoadEditScreen} options={{ title: 'Edit Load' }} />
    </Stack.Navigator>
  );
}