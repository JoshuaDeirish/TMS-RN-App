import { DarkTheme } from "@react-navigation/native";

import colours from "./colours";
import { fontSize, fontWeight } from "./tokens";

/**
 * React Navigation renders its own chrome - headers, drawer, card backgrounds -
 * from a theme object, not from our stylesheets. Without this the app shipped a
 * white header bar and a white drawer sitting on top of a dark UI.
 */
export const navigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colours.accent,
    background: colours.background,
    card: colours.surface1,
    text: colours.textPrimary,
    border: colours.border,
    notification: colours.danger,
  },
};

/** Shared header styling for stack and drawer navigators. */
export const headerScreenOptions = {
  headerStyle: {
    backgroundColor: colours.surface1,
    borderBottomColor: colours.border,
    borderBottomWidth: 1,
    // Flat header: the border is the separator, not a shadow.
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: colours.textPrimary,
  headerTitleStyle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colours.textPrimary,
  },
};

/** Drawer-specific styling. */
export const drawerScreenOptions = {
  ...headerScreenOptions,
  drawerStyle: {
    backgroundColor: colours.surface1,
    borderRightColor: colours.border,
    borderRightWidth: 1,
    width: 280,
  },
  drawerActiveTintColor: colours.onAccent,
  drawerActiveBackgroundColor: colours.accent,
  drawerInactiveTintColor: colours.textSecondary,
  drawerLabelStyle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    marginLeft: -8,
  },
  drawerItemStyle: {
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 2,
  },
};

export default navigationTheme;
