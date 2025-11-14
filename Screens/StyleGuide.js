import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Import your shared styles
import colours from "../styles/colours"
import typography from "../styles/typography";
//import spacing from "../../styles/spacing";

// Import your reusable UI components
import buttons from "../styles/buttons";
//import Input from "../styles/input";
import cards from "../styles/cards";

export default function StyleGuideScreen() {
  return (
    <View>tedfx</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  section: {
    marginTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...typography.heading.h3,
    marginBottom: spacing.md,
  },
});
