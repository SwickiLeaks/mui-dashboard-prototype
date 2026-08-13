import MuiGrid from "@mui/material/Grid2";
import type { BoxProps } from "@mui/material";
import type { ComponentProps } from "react";

import { gridColumns, gutter } from "../tokens";

/** MUI Grid v2's responsive `size` value (number | "auto" | "grow" | responsive). */
type GridSpan = ComponentProps<typeof MuiGrid>["size"];

export type GridProps = {
  children?: React.ReactNode;
  sx?: BoxProps["sx"];
};

/**
 * A 12-column grid row with token-driven gutters (16 mobile → 24 from tablet up).
 * Thin wrapper over MUI Grid v2 — it just bakes in our columns + spacing so
 * callers don't re-specify them. Put `GridItem`s inside.
 */
export function Grid({ children, sx }: GridProps) {
  return (
    <MuiGrid
      container
      columns={gridColumns}
      spacing={{ xs: gutter.xs / 8, md: gutter.md / 8 }}
      sx={sx}
    >
      {children}
    </MuiGrid>
  );
}

export type GridItemProps = {
  /** Column span against the 12-col grid. A number or a responsive map. */
  span?: GridSpan;
  children?: React.ReactNode;
  sx?: BoxProps["sx"];
};

/** A grid cell. `span={{ xs: 12, md: 6, lg: 4 }}` → full-width → half → third. */
export function GridItem({ span = 12, children, sx }: GridItemProps) {
  return (
    <MuiGrid size={span} sx={sx}>
      {children}
    </MuiGrid>
  );
}
