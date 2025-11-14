import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import ContractListScreen from '../../Screens/Contracts/ContractListScreen';
import ContractDetailsScreen from '../../Screens/Contracts/ContractDetailsScreen';
import ContractAddScreen from '../../Screens/Contracts/ContractAddScreen';
import ContractEditScreen from '../../Screens/Contracts/ContractEditScreen';

const Stack = createStackNavigator();

export default function ContractsStack() {
  return (
    <Stack.Navigator initialRouteName="ContractList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="ContractList" component={ContractListScreen} options={{ title: 'Contracts' }} />
      <Stack.Screen name="ContractDetail" component={ContractDetailsScreen} options={{ title: 'Contract Details' }} />
      <Stack.Screen name="ContractAdd" component={ContractAddScreen} options={{ title: 'Add Contract' }} />
      <Stack.Screen name="ContractEdit" component={ContractEditScreen} options={{ title: 'Edit Contract' }} />
    </Stack.Navigator>
  );
}
