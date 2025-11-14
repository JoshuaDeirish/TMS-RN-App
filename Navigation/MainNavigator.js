import React from 'react';
import { Platform, Dimensions } from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import WebSideMenuLayout from './WebSideMenuLayout';

export default function MainNavigator() {
  const isWeb = Platform.OS === 'web';
  const screenWidth = Dimensions.get('window').width;
  const useWebLayout = isWeb && screenWidth > 768;

  return useWebLayout ? <WebSideMenuLayout /> : <DrawerNavigator />;
}