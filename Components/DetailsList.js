import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colours from "../styles/colours";
import typography from "../styles/typography";
import { spacing, radius, fontSize } from "../styles/tokens";

/**
 * Label/value rows for a detail screen.
 *
 * Values now sit in a flex:1.4 column so long text (addresses, notes) has room
 * instead of wrapping awkwardly against a 50/50 split, and the final row has
 * no trailing divider.
 */
export default function DetailsList({ data = [] }) {
  return (
    <View style={styles.detailsBox}>
      {data.map((row, index) => (
        <View
          key={row.label ?? index}
          style={[styles.row, index === data.length - 1 && styles.lastRow]}
        >
          <Text style={[typography.detail.label, styles.label]}>{row.label}</Text>
          <Text style={styles.value} selectable>
            {row.value === null || row.value === undefined || row.value === ""
              ? "—"
              : String(row.value)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  detailsBox: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colours.border,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  label: {
    flex: 1,
    paddingTop: 2,
  },
  value: {
    flex: 1.4,
    textAlign: "right",
    fontSize: fontSize.md,
    color: colours.textPrimary,
    lineHeight: 22,
  },
});
