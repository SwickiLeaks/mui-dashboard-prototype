import { appAccent, tacticalSurface } from "../../theme";

/**
 * Library chrome accent (banner, breadcrumb hover, bucket/crew cards, count
 * chips, footer button, item selection ring). Matches the shared app accent so
 * the library's icon chips read the same blue as the Transfer panel.
 */
export const LIBRARY_ACCENT = appAccent;

/** Shared outer card treatment for plan rows in the library list. */
export const cardOuterSx = {
  flexShrink: 0,
  bgcolor: tacticalSurface.card,
  border: "1.5px solid transparent",
  borderRadius: 3,
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  overflow: "hidden",
  cursor: "pointer",
  transition:
    "background-color 140ms ease, border-color 160ms ease, box-shadow 200ms ease",
} as const;
