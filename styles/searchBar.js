import { StyleSheet } from "react-native";
import colours from "./colours";
import { spacing, radius, fontSize, hitTarget } from "./tokens";

export default StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    minWidth: 200,
  },

  icon: {
    position: "absolute",
    left: spacing.md,
    top: "50%",
    transform: [{ translateY: -9 }],
    color: colours.textMuted,
    zIndex: 2,
  },

  input: {
    minHeight: hitTarget.min,
    backgroundColor: colours.surfaceInput,
    color: colours.textPrimary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    // Room for the icon sitting inside the field
    paddingLeft: spacing.huge,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colours.border,
    fontSize: fontSize.md,
  },
});
