import { Box, type BoxProps } from "@mui/material";

import { overlay } from "../tokens";

export type IconChipProps = {
  /** Icon element, initials string, or count — any node. */
  children: React.ReactNode;
  /** Diameter in px. The app used 28 / 38 / 40 / 72. */
  size?: number;
  /** Override the accent color (e.g. a per-item color). */
  accent?: string;
  /** Empty/inactive state uses a neutral wash. */
  muted?: boolean;
  /** Escape hatch for one-off style overrides. */
  sx?: BoxProps["sx"];
};

/**
 * Circular tinted icon container — the accent at ~14% behind an icon, initials,
 * or a count. Used across the app's rows and empty states.
 */
export function IconChip({ children, size = 38, accent, muted = false, sx }: IconChipProps) {
  return (
    <Box
      sx={[
        (theme) => {
          const tint = accent ?? theme.system.accent.main;
          return {
            width: size,
            height: size,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            fontWeight: 700,
            fontSize: size <= 30 ? 12 : 13,
            letterSpacing: 0.5,
            color: muted ? theme.system.text.secondary : tint,
            bgcolor: muted
              ? overlay(0.05)
              : accent
                ? `${accent}24`
                : theme.system.accent.iconBg,
          };
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  );
}
