import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import buttons from "../styles/buttons";
import colours from "../styles/colours";
import typography from "../styles/typography";
import { spacing, hitTarget } from "../styles/tokens";

/**
 * Header for detail and form screens: back affordance, title, and actions.
 *
 * Cancel/Save now render only when an `onSave` handler is supplied. They were
 * previously unconditional, so read-only Details screens showed a Save button
 * wired to `undefined` - it looked interactive and did nothing.
 *
 * `actions` lets a screen supply its own controls instead.
 */
export default function ScreenHeader({
  title,
  backText,
  onBack,
  onSave,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  saving = false,
  actions,
}) {
  const showFormActions = typeof onSave === "function";

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleBlock}>
        {onBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={backText ? `Back to ${backText}` : "Go back"}
          >
            <FontAwesome name="arrow-left" size={14} color={colours.textSecondary} />
            {backText ? <Text style={styles.backText}>{backText}</Text> : null}
          </TouchableOpacity>
        ) : null}

        <Text style={typography.heading.h2} numberOfLines={2}>{title}</Text>
      </View>

      <View style={styles.rightButtons}>
        {actions}

        {showFormActions ? (
          <>
            <TouchableOpacity
              style={buttons.secondary}
              onPress={onBack}
              disabled={saving}
              accessibilityRole="button"
            >
              <Text style={buttons.secondaryText}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={saving ? buttons.disabled : buttons.primary}
              onPress={onSave}
              disabled={saving}
              accessibilityRole="button"
            >
              <Text style={saving ? buttons.disabledText : buttons.primaryText}>
                {saving ? "Saving…" : saveLabel}
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
    backgroundColor: colours.surface1,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colours.border,
    columnGap: spacing.lg,
    rowGap: spacing.md,
    flexWrap: "wrap",
  },
  titleBlock: {
    flexShrink: 1,
    minWidth: 200,
    rowGap: spacing.xs,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spacing.sm,
    minHeight: 28,
  },
  backText: {
    color: colours.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spacing.md,
    minHeight: hitTarget.min,
  },
});
