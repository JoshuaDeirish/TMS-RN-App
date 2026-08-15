import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderContainer from "../../Components/HeaderContainer";
import DetailsList from "../../Components/DetailsList";
import { useAuth } from "../../Services/Context/AuthContext";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";
import { spacing, radius } from "../../styles/tokens";

/**
 * The signed-in user's own profile.
 *
 * Read from the AuthContext rather than refetched: the provider already holds
 * the profile it loaded at sign-in, and the edit screen calls reloadUser() so
 * this stays current without a second request.
 *
 * Role, email and account status are shown but not editable here - the server
 * makes them read-only on /auth/me/ so a user cannot promote themselves.
 */
export default function UserProfileScreen() {
  const navigation = useNavigation();
  const { user, role } = useAuth();

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ");

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer
        title="Profile"
        rightElement={
          <TouchableOpacity
            style={buttons.primary}
            onPress={() => navigation.navigate("UserProfileEdit")}
            accessibilityRole="button"
          >
            <Text style={buttons.primaryText}>Edit Profile</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.panel}>
          <Text style={typography.heading.h3}>{fullName || user?.email || "—"}</Text>
          {role ? <Text style={styles.role}>{role}</Text> : null}
        </View>

        <View style={styles.panel}>
          <DetailsList
            data={[
              { label: "First Name", value: user?.first_name || "—" },
              { label: "Last Name", value: user?.last_name || "—" },
              { label: "Email", value: user?.email || "—" },
              { label: "Phone", value: user?.phone_number || "—" },
              { label: "Role", value: role || "—" },
              { label: "Account Active", value: user?.is_active ? "Yes" : "No" },
            ]}
          />
        </View>

        <View style={styles.panel}>
          <Text style={typography.heading.h4}>Security</Text>
          <Text style={[typography.text.muted, styles.hint]}>
            Changing your password requires your current one.
          </Text>
          <TouchableOpacity
            style={buttons.secondary}
            onPress={() => navigation.navigate("ChangePassword")}
            accessibilityRole="button"
          >
            <Text style={buttons.secondaryText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <Text style={[typography.text.muted, styles.footnote]}>
          Your email and role are managed by an administrator. Ask them if either
          needs to change.
        </Text>
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
    rowGap: spacing.md,
  },
  role: {
    color: colours.accent,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  hint: { marginTop: -spacing.xs },
  footnote: { textAlign: "center" },
});
