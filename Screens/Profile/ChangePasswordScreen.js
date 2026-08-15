import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenHeader from "../../Components/ScreenHeader";
import * as authAPI from "../../api/AuthAPI";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import input, { placeholderColour } from "../../styles/input";
import { spacing, radius } from "../../styles/tokens";

/**
 * Change your own password.
 *
 * The current password is required by the server, not merely asked for here -
 * a stolen access token must not be enough to lock the real owner out. The
 * confirmation field is the only purely client-side check; everything else is
 * validated server-side and surfaced from the 400 response.
 */
export default function ChangePasswordScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSave = async () => {
    if (saving) return;

    const local = {};
    if (!form.current) local.current = "Required.";
    if (!form.next) local.next = "Required.";
    if (form.next && form.next !== form.confirm) {
      local.confirm = "The two passwords do not match.";
    }
    if (Object.keys(local).length) {
      setErrors(local);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setSaving(true);

    try {
      await authAPI.changePassword({
        current_password: form.current,
        new_password: form.next,
      });
      setForm({ current: "", next: "", confirm: "" });
      setDone(true);
    } catch (err) {
      const data = err?.fieldErrors;
      if (data && typeof data === "object" && !Array.isArray(data)) {
        // Map the server's field names onto this form's.
        const mapped = {};
        if (data.current_password) {
          mapped.current = [].concat(data.current_password).join(" ");
        }
        if (data.new_password) {
          mapped.next = [].concat(data.new_password).join(" ");
        }
        setErrors(mapped);
        if (!Object.keys(mapped).length) {
          setSubmitError(err?.message || "Could not change your password.");
        }
      } else {
        setSubmitError(err?.message || "Could not change your password.");
      }
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { name: "current", label: "Current Password" },
    { name: "next", label: "New Password" },
    { name: "confirm", label: "Confirm New Password" },
  ];

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title="Change Password"
        backText="Profile"
        onBack={() => navigation.navigate("UserProfile")}
        onSave={handleSave}
        saveLabel="Update Password"
        saving={saving}
      />

      {submitError ? (
        <View style={styles.banner}><Text style={styles.bannerText}>{submitError}</Text></View>
      ) : null}

      {done ? (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>
            Password updated. Use it the next time you sign in.
          </Text>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.panel}>
          {fields.map((field) => (
            <View key={field.name}>
              <Text style={[typography.detail.label, styles.label]}>{field.label}</Text>
              <TextInput
                style={[input.input, errors[field.name] && input.inputError]}
                value={form[field.name]}
                onChangeText={(v) => update(field.name, v)}
                placeholderTextColor={placeholderColour}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors[field.name] ? (
                <Text style={input.errorText}>{errors[field.name]}</Text>
              ) : null}
            </View>
          ))}

          <Text style={typography.text.muted}>
            Your new password must meet the system's strength rules and differ
            from your current one.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xxl },
  panel: {
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.xxl,
    rowGap: spacing.sm,
  },
  label: { marginBottom: spacing.xs, marginLeft: spacing.xxs },
  banner: {
    backgroundColor: colours.dangerSoft,
    borderLeftWidth: 3,
    borderLeftColor: colours.danger,
    padding: spacing.md,
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    borderRadius: radius.sm,
  },
  bannerText: { color: colours.danger },
  successBanner: {
    backgroundColor: colours.successSoft,
    borderLeftWidth: 3,
    borderLeftColor: colours.success,
    padding: spacing.md,
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    borderRadius: radius.sm,
  },
  successText: { color: colours.success },
});
