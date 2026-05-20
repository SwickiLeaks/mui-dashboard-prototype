import { monoFont } from "../../theme";

/** Accent color used across the Open Plans panel (banner, card accent, buttons). */
export const PANEL_ACCENT = "#90caf9";

/** Compact icon-button used for inline actions on linked-plan rows. */
export const microActionSx = {
  height: 28,
  px: 1.1,
  minWidth: 0,
  borderRadius: 0.5,
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.1,
  textTransform: "uppercase",
  color: "text.secondary",
  bgcolor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  whiteSpace: "nowrap",
  "& .MuiButton-startIcon": {
    marginRight: "4px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.08)",
    color: "text.primary",
    borderColor: "rgba(255,255,255,0.2)",
  },
} as const;

/** Same as `microActionSx` but hovers to a destructive red. */
export const dangerMicroActionSx = {
  ...microActionSx,
  "&:hover": {
    color: "#ff8a8a",
    bgcolor: "rgba(255,120,120,0.08)",
    borderColor: "rgba(255,120,120,0.3)",
  },
} as const;

/** "Close Plan" destructive button shown inside an expanded plan card. */
export const closeButtonSx = {
  height: 32,
  px: 1.5,
  borderRadius: 0.5,
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.4,
  textTransform: "uppercase",
  color: "#ff8a8a",
  bgcolor: "rgba(255,120,120,0.08)",
  border: "1px solid rgba(255,120,120,0.28)",
  "& .MuiButton-startIcon": {
    marginRight: "6px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,120,120,0.14)",
    borderColor: "rgba(255,120,120,0.45)",
  },
} as const;

/** "Close All" destructive button shown in the banner right-slot. */
export const closeAllButtonSx = {
  height: 30,
  px: 1.25,
  borderRadius: 0.5,
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.3,
  textTransform: "uppercase",
  color: "#ff8a8a",
  bgcolor: "rgba(255,120,120,0.06)",
  border: "1px solid rgba(255,120,120,0.25)",
  "& .MuiButton-startIcon": {
    marginRight: "4px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,120,120,0.12)",
    borderColor: "rgba(255,120,120,0.4)",
  },
} as const;
