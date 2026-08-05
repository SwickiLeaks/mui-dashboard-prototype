import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material";

import { dangerAlpha, overlay, radius } from "../tokens";

export type IconButtonShape = "rounded" | "circle";
export type IconButtonTone = "neutral" | "danger";

export type IconButtonProps = {
  children?: React.ReactNode;
  /** `selectable` adds the active/selected treatment (the header rail look). */
  variant?: "plain" | "selectable";
  shape?: IconButtonShape;
  /** Selected state (only meaningful for `selectable`). */
  active?: boolean;
  /** Hover intent — `danger` reds on hover (e.g. a close-plan button). */
  tone?: IconButtonTone;
  /** Square size in px. */
  size?: number;
  disabled?: boolean;
  title?: string;
  onClick?: MuiIconButtonProps["onClick"];
  /** Escape hatch for one-off style overrides. */
  sx?: MuiIconButtonProps["sx"];
};

/**
 * Consolidates the header-rail `PrimaryIconButton` (selectable, rounded square)
 * and the circular close buttons used on cards/banners.
 */
export function IconButton({
  variant = "plain",
  shape = "rounded",
  active = false,
  tone = "neutral",
  size = 38,
  sx,
  ...rest
}: IconButtonProps) {
  const dangerHover = tone === "danger";
  return (
    <MuiIconButton
      disableFocusRipple
      disableRipple
      sx={[
        (theme) => {
          const s = theme.system;
          const selectable = variant === "selectable";
          return {
            width: size,
            height: size,
            p: 0,
            flexShrink: 0,
            boxSizing: "border-box",
            borderRadius: shape === "circle" ? radius.circle : radius.md,
            color: active ? s.text.primary : s.text.secondary,
            bgcolor: selectable
              ? active
                ? s.surface.panel
                : s.surface.menu
              : "transparent",
            border: selectable
              ? `1px solid ${active ? s.selection.border : theme.palette.divider}`
              : "1px solid transparent",
            boxShadow: selectable && active ? s.selection.ring : "none",
            transition:
              "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease",
            "&:hover": {
              color: dangerHover ? s.feedback.danger : s.text.primary,
              bgcolor: dangerHover
                ? dangerAlpha(0.12)
                : selectable
                  ? active
                    ? s.surface.panel
                    : overlay(0.08)
                  : overlay(0.07),
              borderColor: selectable
                ? active
                  ? s.selection.border
                  : s.border.hover
                : "transparent",
            },
          };
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    />
  );
}
