import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

import colours from "../styles/colours";
import typography from "../styles/typography";
import buttons from "../styles/buttons";
import { spacing, radius, elevation } from "../styles/tokens";

/**
 * Confirmation before a destructive or irreversible action.
 *
 * Not React Native's Alert.alert: that is a no-op on react-native-web, so on
 * the Expo web build a "are you sure?" prompt would simply never appear and
 * the delete would either happen silently or not at all. A Modal behaves the
 * same on every platform the app targets.
 *
 *   <ConfirmDialog
 *     visible={confirming}
 *     title="Delete this load?"
 *     message="TMS-1042 will be removed. This cannot be undone."
 *     confirmLabel="Delete"
 *     destructive
 *     onConfirm={handleDelete}
 *     onCancel={() => setConfirming(false)}
 *   />
 */
export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  busy = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={busy ? undefined : onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={typography.heading.h4}>{title}</Text>
          {message ? (
            <Text style={[typography.text.p, styles.message]}>{message}</Text>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity
              style={buttons.secondary}
              onPress={onCancel}
              disabled={busy}
              accessibilityRole="button"
            >
              <Text style={buttons.secondaryText}>{cancelLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={busy ? buttons.disabled : destructive ? buttons.danger : buttons.primary}
              onPress={onConfirm}
              disabled={busy}
              accessibilityRole="button"
            >
              <Text
                style={
                  busy
                    ? buttons.disabledText
                    : destructive
                    ? buttons.dangerText
                    : buttons.primaryText
                }
              >
                {busy ? "Working…" : confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colours.overlay,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
  },
  sheet: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.xxl,
    rowGap: spacing.md,
    ...elevation.lg,
  },
  message: {
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: spacing.md,
    marginTop: spacing.lg,
    flexWrap: "wrap",
    rowGap: spacing.sm,
  },
});
