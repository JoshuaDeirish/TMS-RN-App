import colours from "./colours";
import { spacing, radius, fontSize, fontWeight } from "./tokens";

/**
 * Tabular list styling.
 *
 * Row text was 18pt with the same weight as the header, so headers and data
 * read as one block. Headers are now a smaller tracked label and rows use a
 * hairline divider instead of a full-strength border on every row.
 */
export default {
  container: {
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colours.border,
    padding: spacing.md,
    overflow: "hidden",
  },

  headerRow: {
    flexDirection: "row",
    columnGap: spacing.md,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colours.borderStrong,
  },

  headerText: {
    flex: 1,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: colours.textMuted,
  },

  itemRow: {
    flexDirection: "row",
    columnGap: spacing.md,
    alignItems: "center",
    minHeight: 52,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colours.border,
  },

  itemRowPressed: {
    backgroundColor: colours.surface3,
  },

  itemText: {
    flex: 1,
    fontSize: fontSize.base,
    color: colours.textPrimary,
  },

  itemTextMuted: {
    flex: 1,
    fontSize: fontSize.base,
    color: colours.textMuted,
  },

  emptyText: {
    padding: spacing.xxl,
    textAlign: "center",
    color: colours.textMuted,
    fontSize: fontSize.base,
  },
};
