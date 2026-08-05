import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "./IconButton";
import { Text } from "./Text";

export type BannerProps = {
  label: string;
  /** Optional status readout shown after the label. */
  status?: string;
  /** Accent the status text (active) vs. secondary (idle). */
  statusActive?: boolean;
  /** Right-aligned content (e.g. a Close All button). Overrides the close X. */
  rightSlot?: React.ReactNode;
  /** Shows a close X on the right when no `rightSlot` is given. */
  onClose?: () => void;
};

/**
 * Panel/section header bar (the app's `ClassificationBanner`): label + optional
 * `label · status` readout + a right slot or close button, over a hairline rule.
 */
export function Banner({ label, status, statusActive, rightSlot, onClose }: BannerProps) {
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        px: 2,
        py: 1.75,
        bgcolor: "transparent",
        borderBottom: `1px solid ${theme.system.border.hairline}`,
        flexShrink: 0,
      })}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ minHeight: 30 }}
      >
        <Stack direction="row" spacing={1} alignItems="baseline" sx={{ minWidth: 0 }}>
          <Text preset="bannerLabel" noWrap>
            {label}
          </Text>
          {status && (
            <>
              <Box component="span" sx={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>
                ·
              </Box>
              <Text
                preset="bannerLabel"
                noWrap
                sx={(theme) => ({
                  color: statusActive ? theme.system.accent.main : theme.system.text.secondary,
                })}
              >
                {status}
              </Text>
            </>
          )}
        </Stack>
        {rightSlot ??
          (onClose && (
            <IconButton shape="circle" size={30} title="Close" onClick={onClose}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          ))}
      </Stack>
    </Box>
  );
}
