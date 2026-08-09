import colours from "./colours";
import { fontSize, fontWeight, lineHeight, letterSpacing } from "./tokens";

/**
 * Text styles.
 *
 * Previously these hardcoded near-black greys (#333, #555, #666) on a dark
 * canvas - body-bold measured 1.48:1 against a 4.5:1 requirement, i.e.
 * effectively invisible. Everything now comes from the palette.
 *
 * All original keys are kept. `text.p` is new: LoginScreen already referenced
 * typography.text.p, which did not exist and silently resolved to undefined.
 */
const typography = {
  text: {
    body: {
      fontSize: fontSize.md,
      lineHeight: Math.round(fontSize.md * lineHeight.normal),
      color: colours.textPrimary,
    },
    // Long-form paragraph text: slightly looser for readability.
    p: {
      fontSize: fontSize.md,
      lineHeight: Math.round(fontSize.md * lineHeight.relaxed),
      color: colours.textSecondary,
    },
    small: {
      fontSize: fontSize.base,
      lineHeight: Math.round(fontSize.base * lineHeight.normal),
      color: colours.textSecondary,
    },
    muted: {
      fontSize: fontSize.base,
      lineHeight: Math.round(fontSize.base * lineHeight.normal),
      color: colours.textMuted,
    },
    bold: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.semibold,
      color: colours.textPrimary,
    },
    link: {
      fontSize: fontSize.md,
      fontWeight: fontWeight.medium,
      color: colours.accent,
    },
  },

  heading: {
    h1: {
      fontSize: fontSize.display,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
      lineHeight: Math.round(fontSize.display * lineHeight.tight),
      color: colours.textPrimary,
    },
    h2: {
      fontSize: fontSize.xxxl,
      fontWeight: fontWeight.bold,
      letterSpacing: letterSpacing.tight,
      lineHeight: Math.round(fontSize.xxxl * lineHeight.tight),
      color: colours.textPrimary,
    },
    h3: {
      fontSize: fontSize.xxl,
      fontWeight: fontWeight.semibold,
      lineHeight: Math.round(fontSize.xxl * lineHeight.tight),
      color: colours.textPrimary,
    },
    h4: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      lineHeight: Math.round(fontSize.lg * lineHeight.tight),
      color: colours.textPrimary,
    },
  },

  subheading: {
    base: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.semibold,
      color: colours.textPrimary,
    },
    light: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.regular,
      color: colours.textSecondary,
    },
  },

  detail: {
    // Field labels above values. Uppercase + tracking reads as a label rather
    // than as competing content.
    label: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.wide,
      textTransform: "uppercase",
      color: colours.textMuted,
    },
    helper: {
      fontSize: fontSize.xs,
      color: colours.textMuted,
    },
    status: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.wide,
      color: colours.accent,
    },
    caption: {
      fontSize: fontSize.xs,
      color: colours.textSecondary,
    },
    mono: {
      fontSize: fontSize.sm,
      fontFamily: "Menlo",
      color: colours.textSecondary,
    },
  },
};

export default typography;
