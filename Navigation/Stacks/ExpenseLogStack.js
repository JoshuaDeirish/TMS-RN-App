import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Screens
import ExpenseLogListScreen from '../../Screens/ExpenseLogs/ExpenseLogListScreen';
import ExpenseLogDetailsScreen from '../../Screens/ExpenseLogs/ExpenseLogDetailsScreen';
import ExpenseLogAddScreen from '../../Screens/ExpenseLogs/ExpenseLogAddScreen';
import ExpenseLogEditScreen from '../../Screens/ExpenseLogs/ExpenseLogEditScreen';

const Stack = createStackNavigator();

export default function ExpenseLogsStack() {
  return (
    <Stack.Navigator initialRouteName="ExpenseLogList" screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="ExpenseLogList" component={ExpenseLogListScreen} options={{ title: 'Expense Logs' }} />
      <Stack.Screen name="ExpenseLogDetail" component={ExpenseLogDetailsScreen} options={{ title: 'Expense Log Details' }} />
      <Stack.Screen name="ExpenseLogAdd" component={ExpenseLogAddScreen} options={{ title: 'Add Expense Log' }} />
      <Stack.Screen name="ExpenseLogEdit" component={ExpenseLogEditScreen} options={{ title: 'Edit Expense Log' }} />
    </Stack.Navigator>
  );
}
