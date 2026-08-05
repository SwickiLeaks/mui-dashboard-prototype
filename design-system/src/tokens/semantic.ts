/**
 * Tier 2 — Semantic tokens.
 *
 * The role-based layer components consume via `theme.system.*`. A theme is just
 * one of these objects — swapping it reskins everything. Only the roles the
 * app's controls + containers actually use are defined here.
 */

import { accentAlpha, color, dangerAlpha, overlay } from "./primitives";

export type SemanticTokens = {
  surface: {
    page: string;
    panel: string;
    card: string;
    cardHover: string;
    cardSelected: string;
    menu: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: {
    hairline: string;
    default: string;
    hover: string;
    strong: string;
    selected: string;
  };
  accent: {
    main: string;
    /** Soft accent wash — pill fills, selected-row backgrounds. */
    soft: string;
    /** Icon-chip background (the `${accent}24` tint). */
    iconBg: string;
    contrastText: string;
  };
  feedback: {
    danger: string;
    dangerSoft: string;
  };
  /** Neutral selection treatment for the icon rail. */
  selection: {
    border: string;
    ring: string;
  };
};

export const tacticalDarkSemantic: SemanticTokens = {
  surface: {
    page: color.ink.page,
    panel: color.ink.panel,
    card: color.ink.card,
    cardHover: color.ink.cardHover,
    cardSelected: color.selectedSurface,
    menu: color.ink.menu,
  },
  text: {
    primary: color.text.primary,
    secondary: color.text.secondary,
    disabled: color.text.disabled,
  },
  border: {
    hairline: overlay(0.06),
    default: overlay(0.08),
    hover: overlay(0.2),
    strong: overlay(0.32),
    selected: accentAlpha(0.6),
  },
  accent: {
    main: color.accent.main,
    soft: accentAlpha(0.16),
    iconBg: accentAlpha(0.14),
    contrastText: color.accent.contrastText,
  },
  feedback: {
    danger: color.danger,
    dangerSoft: dangerAlpha(0.12),
  },
  selection: {
    border: overlay(0.45),
    ring: "inset 0 0 0 1px rgba(255,255,255,0.18)",
  },
};
