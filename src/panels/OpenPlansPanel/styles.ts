import { monoFont } from "../../theme";

/** Compact icon-button used for inline actions on associated-plan rows. */
export const microActionSx = {
  height: 30,
  px: 1.25,
  minWidth: 0,
  borderRadius: 2,
  fontFamily: monoFont,
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: 0.1,
  color: "text.secondary",
  bgcolor: "rgba(255,255,255,0.07)",
  whiteSpace: "nowrap",
  "& .MuiButton-startIcon": {
    marginRight: "4px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.12)",
    color: "text.primary",
  },
} as const;

/** Same as `microActionSx` but hovers to a destructive red. */
export const dangerMicroActionSx = {
  ...microActionSx,
  "&:hover": {
    color: "#ff8a8a",
    bgcolor: "rgba(255,120,120,0.12)",
  },
} as const;

/** "Close All" destructive button shown in the banner right-slot. */
export const closeAllButtonSx = {
  height: 32,
  px: 1.5,
  borderRadius: 2,
  fontFamily: monoFont,
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: 0.1,
  color: "#ff8a8a",
  bgcolor: "rgba(255,120,120,0.1)",
  "& .MuiButton-startIcon": {
    marginRight: "4px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,120,120,0.18)",
  },
} as const;
