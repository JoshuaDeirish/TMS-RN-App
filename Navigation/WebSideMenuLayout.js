// navigation/WebSideMenuLayout.js
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { useAuth } from '../Services/Context/AuthContext';
import { sectionsForRole } from './navigationConfig';
import colours from '../styles/colours';

/**
 * Wide-screen web layout: a persistent side menu instead of a drawer.
 *
 * The menu is built from the shared navigationConfig, so it shows exactly the
 * sections the signed-in role may use. It previously listed every section for
 * everyone and included a "Login" entry that rendered the login form inside the
 * authenticated app.
 */
export default function WebSideMenuLayout() {
  const { user, role, logout } = useAuth();

  const sections = useMemo(() => sectionsForRole(role), [role]);
  const [activeScreen, setActiveScreen] = useState(null);

  // Fall back to the first permitted section rather than indexing blindly -
  // `SCREENS.find(...).component` threw if the active name was not in the list.
  const active =
    sections.find((s) => s.name === activeScreen) ?? sections[0] ?? null;

  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || '';

  if (!active) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Your account has no sections assigned. Contact an administrator.
        </Text>
      </View>
    );
  }

  const ActiveComponent = active.component;

  return (
    <View style={styles.container}>
      <View style={styles.sideMenu}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TMS</Text>
        </View>

        <View style={styles.identity}>
          <Text style={styles.name} numberOfLines={1}>{displayName}</Text>
          {role ? <Text style={styles.role}>{role.toUpperCase()}</Text> : null}
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.menuList}>
          {sections.map((screen) => (
            <TouchableOpacity
              key={screen.name}
              style={[styles.menuItem, active.name === screen.name && styles.activeMenuItem]}
              onPress={() => setActiveScreen(screen.name)}
            >
              <Text style={styles.menuText}>{screen.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Rendering the component directly avoids remounting a one-screen
          Stack.Navigator whose route name changes on every menu click. */}
      <View style={styles.content} key={active.name}>
        <ActiveComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sideMenu: {
    width: 300,
    backgroundColor: '#2C2C2C',
    paddingVertical: 10,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  identity: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colours.border,
  },
  name: { color: colours.textPrimary, fontSize: 15, fontWeight: '600' },
  role: { color: colours.textMuted, fontSize: 11, marginTop: 2, letterSpacing: 1 },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    padding: 12,
    paddingLeft: 16,
  },
  activeMenuItem: {
    backgroundColor: '#2e4bddff',
    borderRadius: 8,
  },
  menuText: {
    fontSize: 18,
    color: '#ffffff',
  },
  logout: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colours.border,
  },
  logoutText: { color: colours.danger, fontWeight: '600' },
  content: {
    flex: 1,
  },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { color: colours.textSecondary, textAlign: 'center' },
});
