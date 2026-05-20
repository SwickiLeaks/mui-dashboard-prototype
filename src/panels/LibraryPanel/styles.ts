import { tacticalSurface } from "../../theme";

/** Fallback accent color when no bucket is selected (banner at root view). */
export const LIBRARY_DEFAULT_ACCENT = "#ffd54f";

/** Shared card outer treatment used by Bucket, Category, Crew, and Item cards. */
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
