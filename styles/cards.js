// styles/cards.js
import colours from "./colours";
import { spacing, radius, elevation } from "./tokens";

/**
 * Card surfaces.
 *
 * These were a light theme (white background, #e5e5e5 border) inside a dark
 * app - any screen using cards.base rendered a white block on near-black.
 * Now built from the surface ramp, so depth comes from lightness rather than
 * from shadows, which read poorly on dark backgrounds.
 */

const base = {
  padding: spacing.lg,
  backgroundColor: colours.surfaceRaised,
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colours.border,
};

export default {
  base,

  // Sits directly on the canvas with no border, e.g. grouped panels
  flat: {
    padding: spacing.lg,
    backgroundColor: colours.surface1,
    borderRadius: radius.lg,
  },

  elevated: {
    ...base,
    ...elevation.md,
  },

  interactive: {
    ...base,
    // Paired with a pressed style at the call site
    borderColor: colours.border,
  },

  selected: {
    ...base,
    borderColor: colours.accent,
    backgroundColor: colours.accentSoft,
  },

  warning: {
    ...base,
    backgroundColor: colours.warningSoft,
    borderColor: colours.warning,
  },

  danger: {
    ...base,
    backgroundColor: colours.dangerSoft,
    borderColor: colours.danger,
  },

  success: {
    ...base,
    backgroundColor: colours.successSoft,
    borderColor: colours.success,
  },

  horizontal: {
    ...base,
    flexDirection: "row",
    alignItems: "center",
    columnGap: spacing.lg,
  },

  textLeftImageRight: {
    ...base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: spacing.lg,
  },
};
