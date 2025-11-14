import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InvoiceListScreen from '../../Screens/Invoices/InvoiceListScreen';
import InvoiceDetailsScreen from '../../Screens/Invoices/InvoiceDetailsScreen';
import InvoiceAddScreen from '../../Screens/Invoices/InvoiceAddScreen';
import InvoiceEditScreen from '../../Screens/Invoices/InvoiceEditScreen';

const Stack = createStackNavigator();

export default function InvoicesStack() {
  return (
    <Stack.Navigator initialRouteName="InvoiceList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="InvoiceList" component={InvoiceListScreen} options={{ title: 'Invoices' }} />
      <Stack.Screen name="InvoiceDetail" component={InvoiceDetailsScreen} options={{ title: 'Invoice Details' }} />
      <Stack.Screen name="InvoiceAdd" component={InvoiceAddScreen} options={{ title: 'Add Invoice' }} />
      <Stack.Screen name="InvoiceEdit" component={InvoiceEditScreen} options={{ title: 'Edit Invoice' }} />
    </Stack.Navigator>
  );
}