import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import DocumentListScreen from '../../Screens/Documents/DocumentListScreen';
import DocumentDetailsScreen from '../../Screens/Documents/DocumentDetailsScreen';
import DocumentAddScreen from '../../Screens/Documents/DocumentAddScreen';
import DocumentEditScreen from '../../Screens/Documents/DocumentEditScreen';

const Stack = createStackNavigator();

export default function DocumentsStack() {
  return (
    <Stack.Navigator initialRouteName="DocumentList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="DocumentList" component={DocumentListScreen} options={{ title: 'Documents' }} />
      <Stack.Screen name="DocumentDetail" component={DocumentDetailsScreen} options={{ title: 'Document Details' }} />
      <Stack.Screen name="DocumentAdd" component={DocumentAddScreen} options={{ title: 'Add Document' }} />
      <Stack.Screen name="DocumentEdit" component={DocumentEditScreen} options={{ title: 'Edit Document' }} />
    </Stack.Navigator>
  );
}
