import colours from "./colours";
import { spacing, radius, fontSize, fontWeight, hitTarget } from "./tokens";

/**
 * Form inputs.
 *
 * Notes on what changed:
 *  - `placeholderTextColor` was declared inside the style object. It is a
 *    TextInput *prop*, not a style, so it had no effect; the value is exported
 *    separately below and should be passed as a prop.
 *  - Helper and error text used negative margins (marginTop: -10) to claw back
 *    the input's bottom margin. Spacing now sits on a container instead, so
 *    text no longer overlaps when it wraps to two lines.
 */

const base = {
  minHeight: hitTarget.min,
  backgroundColor: colours.surfaceInput,
  color: colours.textPrimary,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  borderRadius: radius.md,
  borderWidth: 1,
  borderColor: colours.border,
  fontSize: fontSize.md,
};

/** Pass to TextInput as a prop: <TextInput placeholderTextColor={placeholderColour} /> */
export const placeholderColour = colours.textMuted;

export default {
  input: {
    ...base,
    marginBottom: spacing.lg,
  },

  // Same look without the trailing margin, for use inside a spaced container.
  inputBare: base,

  field: {
    marginBottom: spacing.lg,
  },

  label: {
    color: colours.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.xs,
    marginLeft: spacing.xxs,
  },

  helperText: {
    color: colours.textMuted,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
    marginLeft: spacing.xxs,
  },

  inputFocused: {
    borderColor: colours.focusRing,
  },

  inputError: {
    borderColor: colours.danger,
  },

  errorText: {
    color: colours.danger,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
    marginLeft: spacing.xxs,
  },

  inputDisabled: {
    backgroundColor: colours.disabledSurface,
    borderColor: colours.border,
    color: colours.disabledText,
  },

  multiline: {
    minHeight: 104,
    textAlignVertical: "top",
    paddingTop: spacing.md,
  },
};
