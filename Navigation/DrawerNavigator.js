import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { useAuth } from '../Services/Context/AuthContext';
import { sectionsForRole } from './navigationConfig';
import colours from '../styles/colours';
import { drawerScreenOptions } from '../styles/navigationTheme';
import { spacing } from '../styles/tokens';

const Drawer = createDrawerNavigator();

/** Drawer body: the normal item list, plus who you are and a way out. */
function DrawerContent(props) {
  const { user, role, logout } = useAuth();

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Signed in';

  return (
    <View style={styles.drawerRoot}>
      <DrawerContentScrollView {...props}>
        <View style={styles.identity}>
          <Text style={styles.name} numberOfLines={1}>{displayName}</Text>
          {role ? <Text style={styles.role}>{role.toUpperCase()}</Text> : null}
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DrawerNavigator() {
  const { role } = useAuth();
  const sections = sectionsForRole(role);

  return (
    <Drawer.Navigator
      initialRouteName={sections[0]?.name ?? 'Dashboard'}
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={drawerScreenOptions}
    >
      {sections.map(({ name, component }) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerRoot: { flex: 1 },
  identity: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colours.border,
  },
  name: { fontSize: 16, fontWeight: '600', color: colours.textPrimary },
  role: { fontSize: 12, color: colours.textMuted, marginTop: 2, letterSpacing: 1 },
  logout: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colours.border,
  },
  logoutText: { color: colours.danger, fontWeight: '600' },
});
