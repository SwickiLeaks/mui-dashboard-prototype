/**
 * Tactical theme tokens.
 *
 * Apply these to give a component the same dark / military-mono look used
 * across this dashboard. Components that consume these tokens stay portable —
 * swap the values here to retheme without touching component code.
 */

/**
 * Tactical / mono font. Use for labels, banner text, status pills, button
 * labels, count chips, tree-row tactical names, and any element where the
 * military-readout aesthetic should read. Reach for it via
 * `sx={{ fontFamily: monoFont }}` — without that, components inherit `bodyFont`
 * from the MUI theme.
 */
export const monoFont =
  '"Chakra Petch", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

/**
 * Default body font. Wired into the MUI theme's `typography.fontFamily`, so
 * everything that doesn't explicitly set `monoFont` falls back to this:
 * descriptions, paragraph text, input field values, regular Typography, etc.
 */
export const bodyFont =
  '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

/**
 * Unified app chrome accent — a desaturated teal/green. Used by all panel
 * banners and as a subtle accent on selection rings, header decorations,
 * and small "ready" indicators. Keep category colors (categoryColor map) for
 * plan-specific identity; this is the surrounding-frame color.
 */
export const appAccent = "#80cbc4";

export const tacticalSurface = {
  panel: "#181818",
  card: "#222222",
  cardHover: "#272727",
  cardSelected: "#2a2a2a",
  cardHeader: "#1a1a1a",
  banner: "#0f0f0f",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.18)",
  borderStrong: "rgba(255,255,255,0.28)",
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
  fontSize: 10.5,
  letterSpacing: 1.5,
  fontWeight: 700,
  color: "text.secondary",
} as const;

export const monoValueSx = {
  fontFamily: monoFont,
  fontSize: 12,
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
