import React, { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderContainer from "../../Components/HeaderContainer";
import { useAuth } from "../../Services/Context/AuthContext";
import { sectionsForRole } from "../../Navigation/navigationConfig";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import { spacing, radius } from "../../styles/tokens";

/**
 * Landing screen.
 *
 * A deliberately modest starting point: it greets the user and offers the
 * sections their role can actually reach. It does NOT show counts, KPIs or
 * charts yet - those need the analytics work in a later phase, and a dashboard
 * that displays invented numbers is worse than one that displays none.
 */

// Sections that are navigation plumbing rather than places to work.
const NOT_SHORTCUTS = new Set(["Dashboard", "Settings", "Profile", "Style Guide"]);

export default function DashboardListScreen() {
  const navigation = useNavigation();
  const { user, role } = useAuth();

  const shortcuts = useMemo(
    () => sectionsForRole(role).filter((s) => !NOT_SHORTCUTS.has(s.name)),
    [role]
  );

  const name = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.email;

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer title="Dashboard" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.panel}>
          <Text style={typography.heading.h3}>
            {name ? `Welcome back, ${name}.` : "Welcome back."}
          </Text>
          {role ? (
            <Text style={typography.text.muted}>
              {/* Only the role is capitalised - applying it to the whole line
                  rendered "Signed In As Driver". */}
              Signed in as <Text style={styles.role}>{role}</Text>
            </Text>
          ) : null}
        </View>

        <Text style={[typography.detail.label, styles.sectionLabel]}>Go to</Text>

        <View style={styles.grid}>
          {shortcuts.map((section) => (
            <TouchableOpacity
              key={section.name}
              style={styles.tile}
              onPress={() => navigation.navigate(section.name)}
              accessibilityRole="button"
            >
              <Text style={styles.tileText} numberOfLines={2}>{section.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {shortcuts.length === 0 ? (
          <Text style={typography.text.muted}>
            Your account has no sections assigned yet. Ask an administrator to set your role.
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xxl,
    rowGap: spacing.xl,
  },
  panel: {
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.xxl,
    rowGap: spacing.xs,
  },
  role: {
    textTransform: "capitalize",
  },
  sectionLabel: {
    marginLeft: spacing.xxs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  tile: {
    minWidth: 160,
    flexGrow: 1,
    flexBasis: 160,
    backgroundColor: colours.surface2,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colours.border,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  tileText: {
    color: colours.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
});
