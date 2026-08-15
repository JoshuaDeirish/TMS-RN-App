/**
 * Barrel for the design system.
 *
 *   import { colours, spacing, typography } from "../../styles";
 *
 * Direct imports (`import colours from "../../styles/colours"`) still work and
 * are used throughout the existing screens; both styles are fine.
 */

export { default as colours } from "./colours";
export { default as typography } from "./typography";
export { default as buttons } from "./buttons";
export { default as input, placeholderColour } from "./input";
export { default as cards } from "./cards";
export { default as list } from "./list";
export { default as layout } from "./layout";
export { default as searchBar } from "./searchBar";
export { default as headerStyle } from "./headerStyle";

export {
  spacing, radius, fontSize, fontWeight, lineHeight, letterSpacing,
  elevation, hitTarget, duration, breakpoint,
} from "./tokens";

export { default as tokens } from "./tokens";
