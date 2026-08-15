import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import buttons from "../../styles/buttons";
import { spacing, radius } from "../../styles/tokens";

/**
 * Forgotten password.
 *
 * Self-service reset is NOT implemented, and this screen says so rather than
 * collecting an email address into a form that goes nowhere.
 *
 * What it needs: a reset flow works by emailing a signed, expiring link, so it
 * requires outbound email the backend does not have yet - an SMTP host or a
 * transactional provider (SES, SendGrid, Postmark), its credentials in the
 * server's .env, and Django's EMAIL_BACKEND configured to use them. Those are
 * the owner's accounts to create. Once they exist, Django's built-in
 * PasswordResetView pair covers the token generation and confirmation, and
 * this screen becomes the request form in front of them.
 *
 * Until then an administrator sets passwords via /api/users/, and a signed-in
 * user changes their own under Profile -> Change Password.
 */
export default function ResetPasswordScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={layout.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.panel}>
          <Text style={typography.heading.h3}>Forgotten your password?</Text>

          <Text style={typography.text.p}>
            Password reset by email is not available yet. Please contact your
            system administrator, who can set a new password for your account.
          </Text>

          <Text style={typography.text.p}>
            If you know your current password, you can change it yourself once
            signed in, under Profile.
          </Text>

          <TouchableOpacity
            style={buttons.primary}
            onPress={() => navigation.navigate("Login")}
            accessibilityRole="button"
          >
            <Text style={buttons.primaryText}>Back to sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.xxl,
  },
  panel: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 460,
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.xxl,
    rowGap: spacing.lg,
  },
});
