import { Box, type BoxProps } from "@mui/material";

import { dangerAlpha, overlay, radius } from "../tokens";
import type { SemanticTokens } from "../tokens/semantic";

export type PillTone = "accent" | "neutral" | "danger";
export type PillVariant = "soft" | "outline";
export type PillSize = "sm" | "md";

export type PillProps = {
  children: React.ReactNode;
  tone?: PillTone;
  variant?: PillVariant;
  size?: PillSize;
  /** Escape hatch for one-off style overrides. */
  sx?: BoxProps["sx"];
};

function toneColors(system: SemanticTokens, tone: PillTone) {
  switch (tone) {
    case "accent":
      return { fg: system.accent.main, soft: system.accent.soft };
    case "danger":
      return { fg: system.feedback.danger, soft: dangerAlpha(0.16) };
    case "neutral":
    default:
      return { fg: system.text.secondary, soft: overlay(0.08) };
  }
}

/**
 * Small status label. Replaces the app's duplicated "Active" / "Open" / "Empty"
 * pills and the orphaned `StatPill`.
 */
export function Pill({
  tone = "accent",
  variant = "soft",
  size = "md",
  sx,
  children,
}: PillProps) {
  const dims =
    size === "sm"
      ? { px: 0.85, py: 0.25, fontSize: 10.5 }
      : { px: 1, py: 0.3, fontSize: 11 };
  return (
    <Box
      sx={[
        (theme) => {
          const c = toneColors(theme.system, tone);
          return {
            display: "inline-flex",
            alignItems: "center",
            borderRadius: radius.pill,
            fontWeight: 600,
            letterSpacing: 0.1,
            lineHeight: 1.4,
            whiteSpace: "nowrap",
            flexShrink: 0,
            color: c.fg,
            bgcolor: variant === "soft" ? c.soft : "transparent",
            border: `1px solid ${variant === "outline" ? c.fg : "transparent"}`,
            ...dims,
          };
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  );
}
