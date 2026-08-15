import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import typography from '../../styles/typography';
import colours from '../../styles/colours';
import input, { placeholderColour } from '../../styles/input';
import buttons from '../../styles/buttons';
import { Checkbox } from '../../Components/Checkbox';
import { AuthContext } from '../../Services/Context/AuthContext';


export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async () => {
    if (loading) return;

    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Enter your email and password.");
      return;
    }

    // setLoading(true) was missing, so the button never showed its busy state
    // and could be pressed repeatedly, firing several logins at once.
    setLoading(true);

    try {
      await login({
        email: form.email.trim(),
        password: form.password
      });
      // On success the navigator swaps to the app tree; nothing to do here.
    } catch (err) {
      setError(
        err?.message ||
        err?.detail ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.formCard}>
        <Text style={[typography.heading.h1, styles.title]}>Welcome back</Text>
        <Text style={[typography.text.muted, styles.subtitle]}>
          Sign in to your TREMART account.
        </Text>
        <TextInput
          style={input.input}
          placeholder="Email"
          placeholderTextColor={placeholderColour}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value) => update("email", value)}
        />
        {/* onChange passes an event object, not the text, so form.password
            stayed "" forever and every login attempt sent a blank password.
            React Native's text callback is onChangeText. */}
        <TextInput
          style={input.input}
          placeholder="Password"
          placeholderTextColor={placeholderColour}
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
          value={form.password}
          onChangeText={(value) => update("password", value)}
          onSubmitEditing={handleSubmit}
          returnKeyType="go"
        />

        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={loading ? buttons.disabled : buttons.primary}
          onPress={handleSubmit}
          disabled={loading}
          accessibilityRole="button"
        >
          <Text style={loading ? buttons.disabledText : buttons.primaryText}>
            {loading ? "Signing in…" : "Login"}
          </Text>
        </TouchableOpacity>
        {/* This Text had no style, so it fell back to React Native's default
            black and was invisible on the dark panel. */}
        <View style={styles.rememberRow}>
          <Checkbox />
          <Text style={typography.text.small}>Remember Me</Text>
        </View>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={typography.text.link}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={typography.heading.h1}>Login Pic</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colours.background,
  },
  leftContainer: {
    flex: 1,
    backgroundColor: colours.background,
    paddingHorizontal: 32,
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "stretch",
  },
  // Keeps the form readable on a wide monitor instead of stretching edge to edge.
  formCard: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    rowGap: 4,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginTop: 4,
  },
  forgotButton: {
    marginTop: 16,
    alignSelf: "flex-start",
    minHeight: 32,
    justifyContent: "center",
  },
  errorBanner: {
    backgroundColor: colours.dangerSoft,
    borderLeftWidth: 3,
    borderLeftColor: colours.danger,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: colours.danger,
    fontSize: 14,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: colours.accent,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});