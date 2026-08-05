import { tacticalDarkSemantic } from "../tokens";
import { createSystemTheme } from "./createSystemTheme";

/**
 * The shipped themes. Today there is one; to add another, build a new
 * `SemanticTokens` object and register it here — no component changes needed.
 */
export const tacticalDark = createSystemTheme(tacticalDarkSemantic);

export const themes = {
  tacticalDark,
} as const;

export type ThemeName = keyof typeof themes;
