import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenHeader from "../../Components/ScreenHeader";
import { useAuth } from "../../Services/Context/AuthContext";
import * as authAPI from "../../api/AuthAPI";
import layout from "../../styles/layout";
import colours from "../../styles/colours";
import typography from "../../styles/typography";
import input, { placeholderColour } from "../../styles/input";
import { spacing, radius } from "../../styles/tokens";

const FIELDS = [
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "phone_number", label: "Phone", keyboardType: "phone-pad" },
];

/**
 * Edit your own profile.
 *
 * Only the fields the server actually accepts on /auth/me/ appear here. Email
 * and role are deliberately absent rather than shown-and-disabled: offering a
 * control that silently does nothing is worse than not offering it, and the
 * profile screen explains who to ask instead.
 */
export default function UserProfileEditScreen() {
  const navigation = useNavigation();
  const { user, reloadUser } = useAuth();

  const [form, setForm] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    phone_number: user?.phone_number ?? "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [saving, setSaving] = useState(false);

  const update = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    setSubmitError(null);
    setFieldErrors({});

    try {
      await authAPI.updateCurrentUser(form);
      // Refresh the cached profile so the drawer and Profile screen update.
      await reloadUser();
      navigation.navigate("UserProfile");
    } catch (err) {
      const data = err?.fieldErrors;
      if (data && typeof data === "object" && !Array.isArray(data)) {
        setFieldErrors(
          Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.join(" ") : String(v)])
          )
        );
      }
      setSubmitError(err?.message || "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={layout.container}>
      <ScreenHeader
        title="Edit Profile"
        backText="Profile"
        onBack={() => navigation.navigate("UserProfile")}
        onSave={handleSave}
        saving={saving}
      />

      {submitError ? (
        <View style={styles.banner}><Text style={styles.bannerText}>{submitError}</Text></View>
      ) : null}

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.panel}>
          {FIELDS.map((field) => (
            <View key={field.name}>
              <Text style={[typography.detail.label, styles.label]}>{field.label}</Text>
              <TextInput
                style={[input.input, fieldErrors[field.name] && input.inputError]}
                value={form[field.name]}
                onChangeText={(v) => update(field.name, v)}
                placeholderTextColor={placeholderColour}
                keyboardType={field.keyboardType || "default"}
              />
              {fieldErrors[field.name] ? (
                <Text style={input.errorText}>{fieldErrors[field.name]}</Text>
              ) : null}
            </View>
          ))}

          <Text style={typography.text.muted}>
            Signed in as {user?.email}. Email and role can only be changed by an
            administrator.
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
});
