import React from "react";
import { View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import colours from "../styles/colours";
import { spacing, radius, breakpoint } from "../styles/tokens";

/**
 * Side-by-side detail/form layout that stacks on narrow screens.
 *
 * The columns were previously flex .5 / flex 6, giving the left column about
 * 8% of the width - enough to wrap its text one character per line on a phone
 * or a split browser window. They are now proportioned 1:2 with a minimum
 * width, and stack vertically below ~900px so neither column is squashed.
 *
 * useWindowDimensions re-renders on resize, unlike a one-off
 * Dimensions.get('window') read.
 */
export default function TwoColumnLayout({ leftContent, rightContent }) {
  const { width } = useWindowDimensions();
  const stacked = width < breakpoint.stack;

  if (stacked) {
    return (
      <ScrollView
        style={styles.stackScroll}
        contentContainerStyle={styles.stackContent}
      >
        <View style={styles.panel}>{leftContent}</View>
        <View style={styles.panel}>{rightContent}</View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.panel, styles.leftContainer]}>{leftContent}</View>

      <ScrollView
        style={styles.rightScroll}
        contentContainerStyle={[styles.panel, styles.rightContainer]}
      >
        {rightContent}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    padding: spacing.xxl,
    columnGap: spacing.xxl,
  },
  panel: {
    backgroundColor: colours.surface1,
    padding: spacing.xxl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
  },
  leftContainer: {
    flex: 1,
    minWidth: 240,
    maxWidth: 380,
    alignSelf: "flex-start",
    minHeight: 300,
  },
  rightScroll: {
    flex: 2,
  },
  rightContainer: {
    flexGrow: 1,
  },

  // Stacked (narrow) layout
  stackScroll: { flex: 1 },
  stackContent: {
    padding: spacing.lg,
    rowGap: spacing.lg,
  },
});
