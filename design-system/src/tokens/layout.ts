/**
 * Tier 1 — Layout tokens.
 *
 * The responsive model, kept intentionally simple to start: a 12-column grid at
 * every breakpoint, token-driven gutters + outer margins, and a capped content
 * width. Breakpoints match MUI's defaults on purpose, so responsive `sx` and the
 * Grid "just work" without overriding the theme.
 *
 * Room to grow later: a 4/8/12 column progression, density presets, and named
 * app-shell regions (header / panel / content / drawer).
 */

/** Breakpoint minimums (px) — identical to MUI defaults. */
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** One column count for all breakpoints — the simplest mental model. */
export const gridColumns = 12;

/** Space between columns (px). Tighter on mobile, roomier from tablet up. */
export const gutter = {
  xs: 16,
  md: 24,
} as const;

/** Page outer margins (px). */
export const margin = {
  xs: 16,
  sm: 24,
  lg: 32,
} as const;

/** Content is centered and capped at this width on large screens. */
export const contentMaxWidth = 1440;
