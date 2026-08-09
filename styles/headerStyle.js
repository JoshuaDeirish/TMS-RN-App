import colours from "./colours";
import { spacing } from "./tokens";

export default {
  main: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
    borderBottomColor: colours.border,
    borderBottomWidth: 1,
    backgroundColor: colours.surface1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: spacing.lg,
    // Long titles should wrap rather than push the action button off-screen.
    flexWrap: "wrap",
    rowGap: spacing.md,
  },
};
