import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import colours from "../styles/colours";
import typography from "../styles/typography";
import { spacing, radius } from "../styles/tokens";

export default function BoxListItem({ data, fields, imageKey, image, onPress }) {
  // Accept either a per-row image key or a shared fallback image passed by BoxList.
  const imageSource =
    (imageKey && data[imageKey] ? { uri: data[imageKey] } : null) ??
    image ??
    require("../assets/default-vehicle.jpeg");

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      activeOpacity={0.75}
    >
      <View style={styles.info}>
        {fields.map((field) => (
          <View key={field.key} style={styles.fieldRow}>
            <Text style={typography.detail.label}>{field.label}</Text>
            <Text style={styles.fieldValue} numberOfLines={1}>
              {data[field.key] === null || data[field.key] === undefined || data[field.key] === ""
                ? "—"
                : String(data[field.key])}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.image}>
        <Image source={imageSource} style={styles.imageFile} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colours.surfaceRaised,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    marginBottom: spacing.lg,
    marginHorizontal: spacing.xs,
    overflow: "hidden",
    minHeight: 128,
    maxWidth: "49%",
  },
  info: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
    rowGap: spacing.sm,
  },
  fieldRow: {
    rowGap: 2,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colours.textPrimary,
  },
  image: {
    width: 104,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    backgroundColor: colours.surface3,
  },
  imageFile: {
    width: 72,
    height: 72,
  },
});
