/**
 * Design tokens - the primitive scales every other style file is built from.
 *
 * Nothing here references a colour or a component. Change a value here and it
 * propagates through the whole app, which is the point: before this, spacing
 * and radii were typed by hand at each call site (20, 15, 12, 16, 30...) and
 * drifted apart.
 *
 * Use the named steps rather than raw numbers in screens.
 */

/** 4px rhythm. Every margin, padding and gap should come from here. */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 56,
};

export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
};

/**
 * Type scale. Steps are perceptibly distinct rather than 1px apart, so
 * hierarchy reads at a glance.
 */
export const fontSize = {
  xs: 12,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 32,
};

/**
 * React Native only accepts '100'-'900', 'normal' or 'bold'. Values such as
 * 'semi-bold' are silently ignored - buttons.secondaryText used exactly that,
 * so it never rendered semibold.
 */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

/** Line heights as multipliers of font size, applied where text wraps. */
export const lineHeight = {
  tight: 1.2,
  normal: 1.45,
  relaxed: 1.6,
};

export const letterSpacing = {
  tight: -0.2,
  normal: 0,
  wide: 0.4,
  wider: 1,
};

/**
 * Elevation. On a dark UI a drop shadow reads poorly, so depth comes mostly
 * from surface lightness (see colours.surface1..3); these add a subtle lift
 * for genuinely floating elements only.
 */
export const elevation = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.38,
    shadowRadius: 24,
    elevation: 12,
  },
};

/**
 * Minimum interactive size. 44pt is Apple's guidance and close to Android's
 * 48dp; several existing controls were ~34pt tall and awkward to hit.
 */
export const hitTarget = {
  min: 44,
};

export const duration = {
  fast: 120,
  normal: 200,
  slow: 320,
};

/** Viewport width below which two-column layouts stack. */
export const breakpoint = {
  stack: 900,
  wide: 1280,
};

export default {
  spacing, radius, fontSize, fontWeight, lineHeight, letterSpacing,
  elevation, hitTarget, duration, breakpoint,
};
