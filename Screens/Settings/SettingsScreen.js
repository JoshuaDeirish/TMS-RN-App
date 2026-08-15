import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderContainer from "../../Components/HeaderContainer";
import DetailsList from "../../Components/DetailsList";
import ConfirmDialog from "../../Components/ConfirmDialog";
import { useAuth } from "../../Services/Context/AuthContext";
import { API_BASE_URL } from "../../Services/apiConfig";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";
import { spacing, radius } from "../../styles/tokens";

/**
 * Settings.
 *
 * Deliberately small. There are no user preferences to store yet - no theme
 * switch (the app is dark-only by design), no notification toggles (nothing
 * generates notifications outside messaging yet). Rather than invent controls
 * that do nothing, this shows the account and connection facts that are
 * genuinely useful when something is wrong, plus sign-out.
 */
export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, role, logout } = useAuth();

  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
    try {
      await logout();
    } finally {
      setBusy(false);
      setConfirming(false);
    }
  };

  return (
    <SafeAreaView style={layout.container}>
      <HeaderContainer title="Settings" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.panel}>
          <Text style={typography.heading.h4}>Account</Text>
          <DetailsList
            data={[
              { label: "Signed in as", value: user?.email || "—" },
              { label: "Role", value: role || "—" },
            ]}
          />
          <TouchableOpacity
            style={buttons.secondary}
            onPress={() => navigation.navigate("Profile", { screen: "UserProfile" })}
            accessibilityRole="button"
          >
            <Text style={buttons.secondaryText}>Open Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.panel}>
          <Text style={typography.heading.h4}>Connection</Text>
          <Text style={[typography.text.muted, styles.hint]}>
            Which server this app is talking to. Useful when diagnosing a
            connection problem.
          </Text>
          <DetailsList data={[{ label: "API", value: API_BASE_URL }]} />
        </View>

        <View style={styles.panel}>
          <Text style={typography.heading.h4}>Session</Text>
          <TouchableOpacity
            style={buttons.dangerQuiet}
            onPress={() => setConfirming(true)}
            accessibilityRole="button"
          >
            <Text style={buttons.dangerQuietText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmDialog
        visible={confirming}
        title="Log out?"
        message="You will need your email and password to sign back in."
        confirmLabel="Log out"
        destructive
        busy={busy}
        onConfirm={signOut}
        onCancel={() => setConfirming(false)}
      />
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
  hint: { marginTop: -spacing.xs },
});
