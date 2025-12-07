import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import colours from "../styles/colours";

export default function TwoColumnLayout({
  leftContent,
  rightContent,
}) {
  return (
    <View style={styles.mainContainer}>
      {/* LEFT COLUMN */}
      <View style={styles.leftContainer}>{leftContent}</View>

      {/* RIGHT COLUMN */}
      <ScrollView contentContainerStyle={styles.rightContainer}>
        {rightContent}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    columnGap: 20,
  },
  leftContainer: {
    flex: 4,
    backgroundColor: colours.headerBackground,
    padding: 20,
    borderRadius: 15,
    //40%
  },
  rightContainer: {
    flex: 6,
    backgroundColor: colours.headerBackground,
    padding: 20,
    borderRadius: 15,
    //60%
  },
});
