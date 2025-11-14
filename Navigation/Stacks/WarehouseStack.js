import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import WarehouseListScreen from '../../Screens/Warehouses/WarehouseListScreen';
import WarehouseDetailsScreen from '../../Screens/Warehouses/WarehouseDetailsScreen';
import WarehouseAddScreen from '../../Screens/Warehouses/WarehouseAddScreen';
import WarehouseEditScreen from '../../Screens/Warehouses/WarehouseEditScreen';

const Stack = createStackNavigator();

export default function WarehousesStack() {
  return (
    <Stack.Navigator initialRouteName='WarehouseList' screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="WarehouseList" component={WarehouseListScreen} options={{ title: 'Warehouses' }}/>
      <Stack.Screen name="WarehouseDetail" component={WarehouseDetailsScreen} options={{ title: 'Warehouse Details' }}/>
      <Stack.Screen name="WarehouseEdit" component={WarehouseEditScreen} options={{ title: 'Edit Warehouse' }}/>
      <Stack.Screen name="WarehouseAdd" component={WarehouseAddScreen} options={{ title: 'Add Warehouse' }}/>
    </Stack.Navigator>
  );
}