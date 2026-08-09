// styles/buttons.js
import colours from "./colours";
import { spacing, radius, fontSize, fontWeight, hitTarget, elevation } from "./tokens";

/**
 * Buttons.
 *
 * Fixes carried over from the original:
 *  - `maxWidth: "20vw"` was a CSS viewport unit, which React Native cannot
 *    parse; it also capped buttons at a fifth of the screen on web, which is
 *    why long labels were cramped.
 *  - `fontWeight: 'semi-bold'` is not a valid RN weight, so it was ignored.
 *  - Colours were Bootstrap defaults (#007bff, #6c757d, #dc3545) rather than
 *    the app's own accent, so buttons never matched the brand.
 *  - Height was ~34pt; controls are now at least 44pt for comfortable tapping.
 */

const baseButton = {
  minHeight: hitTarget.min,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.xl,
  borderRadius: radius.md,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  columnGap: spacing.sm,
};

const baseText = {
  fontSize: fontSize.md,
  fontWeight: fontWeight.semibold,
  textAlign: "center",
};

const buttons = {
  base: baseButton,

  // Primary action
  primary: {
    ...baseButton,
    backgroundColor: colours.accent,
    ...elevation.sm,
  },
  primaryText: {
    ...baseText,
    color: colours.onAccent,
  },

  // Secondary / neutral action
  secondary: {
    ...baseButton,
    backgroundColor: colours.surface3,
    borderWidth: 1,
    borderColor: colours.borderStrong,
  },
  secondaryText: {
    ...baseText,
    color: colours.textPrimary,
  },

  // Destructive action
  danger: {
    ...baseButton,
    backgroundColor: colours.danger,
  },
  dangerText: {
    ...baseText,
    color: colours.onStatus,
  },

  // Low-emphasis destructive: reads as dangerous without shouting
  dangerQuiet: {
    ...baseButton,
    backgroundColor: colours.dangerSoft,
    borderWidth: 1,
    borderColor: colours.danger,
  },
  dangerQuietText: {
    ...baseText,
    color: colours.danger,
  },

  disabled: {
    ...baseButton,
    backgroundColor: colours.disabledSurface,
    borderWidth: 1,
    borderColor: colours.border,
  },
  disabledText: {
    ...baseText,
    color: colours.disabledText,
  },

  // Outline - used for filters and tags
  outline: {
    ...baseButton,
    backgroundColor: colours.transparent,
    borderWidth: 1,
    borderColor: colours.accent,
  },
  outlineText: {
    ...baseText,
    color: colours.accent,
  },

  // Text-only, for tertiary actions in tight spaces
  ghost: {
    ...baseButton,
    backgroundColor: colours.transparent,
    paddingHorizontal: spacing.md,
  },
  ghostText: {
    ...baseText,
    color: colours.textSecondary,
  },

  // Compact variant for toolbars and filter rows
  small: {
    minHeight: 34,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: spacing.xs,
  },
  smallText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },

  pressed: {
    opacity: 0.85,
  },
};

export default buttons;
