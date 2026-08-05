import { Box } from "@mui/material";

import { overlay, radius } from "../tokens";

export type CountChipProps = {
  count: number;
  /** Optional trailing label, e.g. "Open". */
  label?: string;
  /** Dim to a "no data" state when the count is zero. */
  dimWhenEmpty?: boolean;
};

/**
 * Numeric count badge. Populated counts use an accent tint; empty counts dim.
 * Replaces the Library `CountChip` and the association-count bubble.
 */
export function CountChip({ count, label, dimWhenEmpty = true }: CountChipProps) {
  const populated = count > 0 || !dimWhenEmpty;
  return (
    <Box
      sx={(theme) => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        minWidth: 20,
        height: 20,
        px: 0.75,
        boxSizing: "border-box",
        borderRadius: radius.pill,
        fontWeight: 700,
        fontSize: 11.5,
        lineHeight: 1,
        color: populated ? theme.system.accent.main : theme.system.text.secondary,
        bgcolor: populated ? theme.system.accent.soft : overlay(0.05),
      })}
    >
      <span>{count}</span>
      {label && (
        <Box component="span" sx={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>
          {label}
        </Box>
      )}
    </Box>
  );
}
