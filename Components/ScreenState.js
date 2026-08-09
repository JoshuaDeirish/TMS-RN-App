import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

import colours from "../styles/colours";
import typography from "../styles/typography";
import buttons from "../styles/buttons";

/**
 * The three states every data-backed screen needs, in one place so they look
 * and behave the same everywhere.
 *
 *   <ScreenState loading={loading} error={error} onRetry={load}
 *                empty={!rows.length} emptyText="No loads yet.">
 *     ...content...
 *   </ScreenState>
 */
export default function ScreenState({
  loading,
  error,
  onRetry,
  empty,
  emptyText = "Nothing to show yet.",
  children,
}) {
  if (loading) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" color={colours.accent} />
        <Text style={[typography.text.muted, styles.spaced]}>Loading…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centre}>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={[typography.text.muted, styles.spaced, styles.centreText]}>
          {typeof error === "string" ? error : error?.message || "Unknown error"}
        </Text>
        {onRetry ? (
          <TouchableOpacity style={[buttons.primary, styles.spaced]} onPress={onRetry}>
            <Text style={buttons.primaryText}>Try again</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (empty) {
    return (
      <View style={styles.centre}>
        <Text style={[typography.text.muted, styles.centreText]}>{emptyText}</Text>
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    minHeight: 200,
  },
  centreText: { textAlign: "center" },
  spaced: { marginTop: 12 },
  errorTitle: {
    color: colours.danger,
    fontSize: 16,
    fontWeight: "600",
  },
});
