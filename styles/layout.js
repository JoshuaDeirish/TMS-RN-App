// styles/layout.js
import colours from "./colours";
import { spacing } from "./tokens";

export default {
  container: {
    flex: 1,
    backgroundColor: colours.background,
  },
  containerTwo: {
    flex: 1,
    backgroundColor: colours.surface1,
  },
  subContainer: {
    flex: 1,
    padding: spacing.xxl,
    backgroundColor: colours.background,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  fullHeight: {
    height: "100%",
  },

  /**
   * Toolbar strip beneath a screen header (search + filters).
   * Wraps rather than overflowing: at narrow widths the filter buttons
   * previously ran off the right edge instead of moving to a second line.
   */
  section: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderBottomColor: colours.border,
    borderBottomWidth: 1,
    backgroundColor: colours.surface1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: spacing.sm,
    rowGap: spacing.sm,
  },

  // Vertical rhythm helpers
  stackSm: { rowGap: spacing.sm },
  stackMd: { rowGap: spacing.lg },
  stackLg: { rowGap: spacing.xxl },
  inlineSm: { flexDirection: "row", alignItems: "center", columnGap: spacing.sm },
  inlineMd: { flexDirection: "row", alignItems: "center", columnGap: spacing.lg },
};
