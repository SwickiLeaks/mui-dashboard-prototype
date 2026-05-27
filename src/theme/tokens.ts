/**
 * Tactical theme tokens.
 *
 * Apply these to give a component the same dark / military-mono look used
 * across this dashboard. Components that consume these tokens stay portable —
 * swap the values here to retheme without touching component code.
 */

/**
 * Default body font. Wired into the MUI theme's `typography.fontFamily`.
 */
export const bodyFont =
  '"Roboto", system-ui, -apple-system, "Segoe UI", Arial, sans-serif';

/**
 * Label font. Aliased to `bodyFont` so labels stay clean and readable; kept as
 * a separate export so a future display font can be swapped in without touching
 * every component that uses it.
 */
export const monoFont = bodyFont;

/**
 * Unified app chrome accent. Used by panel banners, header decorations, and
 * small selection accents. Per-plan identity stays on category colors.
 */
export const appAccent = "#90caf9";

export const tacticalSurface = {
  panel: "#262626",
  card: "#2d2d2d",
  cardHover: "#323232",
  cardSelected: "#1a1a1a",
  cardHeader: "#1f1f1f",
  banner: "#1c1c1c",
  border: "rgba(255,255,255,0.08)",
  borderHover: "rgba(255,255,255,0.2)",
  borderStrong: "rgba(255,255,255,0.32)",
  hairline: "rgba(255,255,255,0.06)",
};

/**
 * Shared "active/selected" treatment so selection reads the same everywhere
 * without resorting to the primary-blue palette. Components that have a
 * contextual color (e.g. Library bucket accent) layer it on top of `bg`.
 */
export const selectionStyles = {
  bg: "#383838",
  bgRest: "#303030",
  border: "rgba(255, 255, 255, 0.45)",
  borderRest: "#555",
  ring: "inset 0 0 0 1px rgba(255, 255, 255, 0.18)",
  glow: "0 8px 22px rgba(0, 0, 0, 0.45)",
};

export const monoLabelSx = {
  fontFamily: monoFont,
  fontSize: 11,
  letterSpacing: 0.5,
  fontWeight: 700,
  color: "text.secondary",
} as const;

export const monoValueSx = {
  fontFamily: monoFont,
  fontSize: 12.5,
  fontWeight: 600,
  color: "text.primary",
} as const;

export const scrollbarTacticalSx = {
  scrollbarWidth: "thin",
  scrollbarColor: "#555 #1a1a1a",
  "&::-webkit-scrollbar": { width: 6 },
  "&::-webkit-scrollbar-track": { backgroundColor: "#1a1a1a" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#555",
    borderRadius: 0,
  },
} as const;
