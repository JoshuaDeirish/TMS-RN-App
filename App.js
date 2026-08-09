import React from 'react';
import AppNavigator from './Navigation/AppNavigator';
import { AuthProvider } from './Services/Context/AuthContext';

export default function App() {
  return(
    <AuthProvider>
    <AppNavigator />
    </AuthProvider>
  ) 
}