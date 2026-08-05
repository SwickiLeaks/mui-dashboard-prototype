/**
 * Tier 1 — Primitive tokens.
 *
 * Only the raw values the app's components actually show, plus the two alpha
 * helpers that formalize ramps the app wrote by hand. Components never import
 * primitives directly — they read the semantic roles in `semantic.ts`.
 */

/* Alpha helpers ---------------------------------------------------- */

/** White overlay at opacity `n` (0–1). Hairlines, fills, hover washes. */
export const overlay = (n: number) => `rgba(255,255,255,${n})`;

/** The accent color as rgba at opacity `n` (replaces the `${accent}24` trick). */
export const accentAlpha = (n: number) => `rgba(144,202,249,${n})`;

/** The danger color as rgba at opacity `n`. */
export const dangerAlpha = (n: number) => `rgba(255,120,120,${n})`;

/* Color — exactly the palette shown across the app ----------------- */

export const color = {
  /** Neutral surface ramp, darkest → lightest. */
  ink: {
    page: "#0f0f0f",
    menu: "#1c1c1c",
    panel: "#262626",
    card: "#2d2d2d",
    cardHover: "#323232",
  },
  accent: {
    main: "#90caf9",
    /** Black that sits legibly on top of the accent. */
    contrastText: "#0f0f0f",
  },
  /** Blue-charcoal selected-card background. */
  selectedSurface: "#2a3139",
  danger: "#ff8a8a",
  text: {
    primary: "#e6e6e6",
    secondary: "#9e9e9e",
    disabled: "rgba(255,255,255,0.38)",
  },
} as const;

/* Radii ------------------------------------------------------------ *
 * Stored as CSS strings so they apply as exact pixels in `sx`.       */

export const radius = {
  sm: "2px",
  md: "8px",
  lg: "10px",
  xl: "12px",
  pill: "999px",
  circle: "50%",
} as const;

/* Elevation -------------------------------------------------------- */

export const shadow = {
  card: "0 2px 6px rgba(0,0,0,0.3)",
  cardHover: "0 6px 16px rgba(0,0,0,0.36)",
  cardSelected: "0 6px 18px rgba(0,0,0,0.4)",
  cardSelectedHover: "0 8px 20px rgba(0,0,0,0.44)",
} as const;

/* Typography — the type scale the app uses ------------------------- */

export const fontFamily =
  '"Roboto", system-ui, -apple-system, "Segoe UI", Arial, sans-serif';

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  "2xs": 11,
  xs: 12,
  sm: 13,
  md: 13.5,
  base: 14,
  lg: 16,
  xl: 17,
} as const;

/** Typography presets → wired into MUI custom variants. */
export const typePreset = {
  title: {
    fontFamily,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
    lineHeight: 1.25,
  },
  bannerLabel: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.4,
  },
  sectionLabel: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.2,
  },
  dataLabel: {
    fontFamily,
    fontSize: fontSize["2xs"],
    fontWeight: fontWeight.bold,
    letterSpacing: 1.2,
  },
  dataValue: {
    fontFamily,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  meta: {
    fontFamily,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.1,
  },
} as const;
