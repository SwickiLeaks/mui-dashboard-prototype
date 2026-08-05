import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { accentAlpha, dangerAlpha, overlay, radius } from "../tokens";
import type { SemanticTokens } from "../tokens/semantic";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost";
export type ButtonTone = "neutral" | "accent" | "danger";
export type ButtonSize = "sm" | "md";

export type ButtonProps = {
  children?: React.ReactNode;
  /** Fill treatment. */
  variant?: ButtonVariant;
  /** Semantic color role. */
  tone?: ButtonTone;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: MuiButtonProps["onClick"];
  /** Escape hatch for one-off style overrides. */
  sx?: MuiButtonProps["sx"];
};

type ToneSet = { main: string; contrast: string; soft: string; softHover: string };

function toneSet(system: SemanticTokens, tone: ButtonTone): ToneSet {
  switch (tone) {
    case "accent":
      return {
        main: system.accent.main,
        contrast: system.accent.contrastText,
        soft: system.accent.soft,
        softHover: accentAlpha(0.24),
      };
    case "danger":
      return {
        main: system.feedback.danger,
        contrast: "#1a1010",
        soft: system.feedback.dangerSoft,
        softHover: dangerAlpha(0.18),
      };
    case "neutral":
    default:
      return {
        main: system.text.primary,
        contrast: system.surface.page,
        soft: overlay(0.07),
        softHover: overlay(0.12),
      };
  }
}

const sizeSet: Record<ButtonSize, SxProps<Theme>> = {
  sm: { height: 30, px: 1.25, fontSize: 11.5 },
  md: { height: 36, px: 1.75, fontSize: 13 },
};

function variantSx(
  system: SemanticTokens,
  variant: ButtonVariant,
  tone: ButtonTone
): SxProps<Theme> {
  const t = toneSet(system, tone);
  switch (variant) {
    case "solid":
      return {
        bgcolor: t.main,
        color: t.contrast,
        border: "1px solid transparent",
        boxShadow: system.selection.ring,
        "&:hover": { bgcolor: t.main, filter: "brightness(1.08)" },
      };
    case "soft":
      return {
        bgcolor: t.soft,
        color: t.main,
        border: "1px solid transparent",
        "&:hover": { bgcolor: t.softHover },
      };
    case "outline":
      return {
        bgcolor: "transparent",
        color: t.main,
        border: `1px solid ${tone === "neutral" ? system.border.strong : t.main}`,
        "&:hover": {
          bgcolor: t.soft,
          borderColor: tone === "neutral" ? system.border.hover : t.main,
        },
      };
    case "ghost":
    default:
      return {
        bgcolor: "transparent",
        color: tone === "neutral" ? system.text.secondary : t.main,
        border: "1px solid transparent",
        "&:hover": {
          bgcolor: t.soft,
          color: tone === "neutral" ? system.text.primary : t.main,
        },
      };
  }
}

/**
 * The one button. Replaces the app's divergent primary buttons (PanelActions,
 * FooterBar, EmptyState) plus the micro / close-all / control-bar variants,
 * expressed as `variant` × `tone` × `size`.
 */
export function Button({
  variant = "soft",
  tone = "neutral",
  size = "md",
  sx,
  ...rest
}: ButtonProps) {
  return (
    <MuiButton
      disableElevation
      disableRipple
      sx={[
        (theme) => ({
          fontWeight: 600,
          letterSpacing: 0.1,
          borderRadius: radius.md,
          minWidth: 0,
          whiteSpace: "nowrap",
          transition:
            "background-color 140ms ease, border-color 160ms ease, color 140ms ease, filter 140ms ease",
          "& .MuiButton-startIcon": { mr: 0.5, ml: 0 },
          ...(sizeSet[size] as object),
          ...(variantSx(theme.system, variant, tone) as object),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    />
  );
}
