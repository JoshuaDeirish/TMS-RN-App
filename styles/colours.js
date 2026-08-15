/**
 * Colour palette.
 *
 * A refresh of the original dark theme, not a replacement: same near-black
 * canvas and blue accent, but with a proper elevation ramp and text colours
 * that actually meet contrast requirements. Several of the previous values
 * were unreadable - typography used #333 and #666 for body and label text on
 * a #121212 background, roughly 1.5:1 and 2.3:1 against a 4.5:1 requirement.
 *
 * Every original key is preserved so existing screens keep working; the
 * semantic names below are what new code should use.
 */

// --- Raw ramp ---------------------------------------------------------------
// Slightly cool-tinted greys. Depth on dark UIs comes from surface lightness
// rather than shadow, so these steps are deliberately even.
const ink = {
  900: '#0F1115', // app canvas
  800: '#161920', // raised surface / panels
  700: '#1C2028', // cards
  600: '#232833', // inputs, hover
  500: '#2C323E', // borders
  400: '#3A4150', // strong borders, dividers
};

const blue = {
  600: '#2544D8',
  500: '#3B5BFF', // accent
  400: '#5C77FF',
  soft: 'rgba(59, 91, 255, 0.16)',
};

export default {
  // --- Original keys (kept for compatibility) -------------------------------
  background: ink[900],
  headerBackground: ink[800],
  border: ink[500],

  textPrimary: '#F3F5F9',
  textSecondary: '#B9C1D0',
  textMuted: '#8B94A6',

  accent: blue[500],
  accentHover: blue[400],
  success: '#3DD68C',
  warning: '#F5B544',
  danger: '#FF6B6B',

  surface1: ink[800],
  surface2: ink[700],
  surface3: ink[600],

  // --- Semantic additions ---------------------------------------------------
  canvas: ink[900],
  surfaceRaised: ink[700],
  surfaceInput: ink[600],
  borderSubtle: ink[500],
  borderStrong: ink[400],

  accentPressed: blue[600],
  accentSoft: blue.soft,
  onAccent: '#FFFFFF',

  info: '#5AA9FF',

  // Tinted backgrounds for status chips and inline banners. Alpha keeps them
  // sitting on any surface without a per-surface variant.
  successSoft: 'rgba(61, 214, 140, 0.16)',
  warningSoft: 'rgba(245, 181, 68, 0.16)',
  dangerSoft: 'rgba(255, 107, 107, 0.16)',
  infoSoft: 'rgba(90, 169, 255, 0.16)',

  // Text placed on a solid status colour. These are dark on purpose: the
  // status colours are light, so white text on them would fail contrast.
  onStatus: '#0F1115',

  disabledSurface: ink[700],
  disabledText: '#69707E',

  overlay: 'rgba(0, 0, 0, 0.62)',
  focusRing: blue[400],

  transparent: 'transparent',
};
