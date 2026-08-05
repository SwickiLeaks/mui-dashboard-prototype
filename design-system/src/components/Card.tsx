import { Box, type BoxProps } from "@mui/material";

import { radius, shadow } from "../tokens";

export type CardProps = {
  children?: React.ReactNode;
  /** Selected state — accent border + raised elevation + selected surface. */
  selected?: boolean;
  /** Apply hover feedback (default true when an `onClick` is present). */
  interactive?: boolean;
  onClick?: BoxProps["onClick"];
  /** Escape hatch for one-off style overrides. */
  sx?: BoxProps["sx"];
};

/**
 * Base surface card: rest / hover / selected states + elevation. The shared
 * shell behind Tile and the Library list cards (`cardOuterSx`).
 */
export function Card({ selected = false, interactive, sx, onClick, children }: CardProps) {
  const isInteractive = interactive ?? Boolean(onClick);
  return (
    <Box
      onClick={onClick}
      sx={[
        (theme) => {
          const s = theme.system;
          return {
            position: "relative",
            bgcolor: selected ? s.surface.cardSelected : s.surface.card,
            border: `1.5px solid ${selected ? s.border.selected : "transparent"}`,
            borderRadius: radius.xl,
            boxShadow: selected ? shadow.cardSelected : shadow.card,
            overflow: "hidden",
            cursor: isInteractive ? "pointer" : "default",
            transition:
              "background-color 160ms ease, border-color 160ms ease, box-shadow 220ms ease",
            ...(isInteractive && {
              "&:hover": {
                bgcolor: selected ? s.surface.cardSelected : s.surface.cardHover,
                boxShadow: selected ? shadow.cardSelectedHover : shadow.cardHover,
              },
            }),
          };
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  );
}
