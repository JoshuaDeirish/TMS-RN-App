import React from "react";
import { View, Text, StyleSheet } from "react-native";
import typography from "../styles/typography";

export default function DetailsList({ data }) {
  return (
    <View style={styles.detailsBox}>
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={[typography.text.muted, styles.label]}>
            {row.label}
          </Text>

          <Text style={[typography.text.body, styles.value]}>
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  detailsBox: {
    width: "100%",
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    padding: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  label: {
    flex: 1,
  },

  value: {
    flex: 1,
    textAlign: "right",
  },
});
