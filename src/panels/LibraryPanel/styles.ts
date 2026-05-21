import { tacticalSurface } from "../../theme";

/**
 * Library chrome accent (banner, breadcrumb hover, bucket/crew cards, count
 * chips, footer button, item selection ring). Intentionally neutral so the
 * bright category colors stay reserved for plan tiles and the right drawer.
 * The only category-color sprinkles in the library are the category-card
 * stripe and icon, and the plan-card stripes in the items view.
 */
export const LIBRARY_ACCENT = "#bdbdbd";

/** Shared outer card treatment for plan rows in the library list. */
export const cardOuterSx = {
  flexShrink: 0,
  bgcolor: tacticalSurface.card,
  border: `1px solid ${tacticalSurface.border}`,
  borderRadius: 0.5,
  overflow: "hidden",
  cursor: "pointer",
  transition:
    "background-color 140ms ease, border-color 160ms ease, box-shadow 200ms ease",
} as const;
