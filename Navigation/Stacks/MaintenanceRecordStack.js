import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaintenanceRecordListScreen from '../../Screens/MaintenanceRecords/MaintenanceRecordListScreen';
import MaintenanceRecordDetailsScreen from '../../Screens/MaintenanceRecords/MaintenanceRecordDetailsScreen';
import MaintenanceRecordAddScreen from '../../Screens/MaintenanceRecords/MaintenanceRecordAddScreen';
import MaintenanceRecordEditScreen from '../../Screens/MaintenanceRecords/MaintenanceRecordEditScreen';

const Stack = createStackNavigator();

export default function MaintenanceRecordsStack() {
  return (
    <Stack.Navigator initialRouteName="MaintenanceRecordList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="MaintenanceRecordList" component={MaintenanceRecordListScreen} options={{ title: 'Maintenance Records' }} />
      <Stack.Screen name="MaintenanceRecordDetail" component={MaintenanceRecordDetailsScreen} options={{ title: 'Maintenance Record Details' }} />
      <Stack.Screen name="MaintenanceRecordAdd" component={MaintenanceRecordAddScreen} options={{ title: 'Add Maintenance Record' }} />
      <Stack.Screen name="MaintenanceRecordEdit" component={MaintenanceRecordEditScreen} options={{ title: 'Edit Maintenance Record' }} />
    </Stack.Navigator>
  );
}