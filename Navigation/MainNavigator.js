import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';

import DrawerNavigator from './DrawerNavigator';
import WebSideMenuLayout from './WebSideMenuLayout';
import { breakpoint } from '../styles/tokens';

/**
 * Picks the wide-screen side menu or the drawer.
 *
 * This previously read Dimensions.get('window').width once at mount, so
 * resizing a browser window never switched layouts - you had to reload.
 * useWindowDimensions subscribes to changes.
 */
export default function MainNavigator() {
  const { width } = useWindowDimensions();
  const useWebLayout = Platform.OS === 'web' && width >= breakpoint.stack;

  return useWebLayout ? <WebSideMenuLayout /> : <DrawerNavigator />;
}
