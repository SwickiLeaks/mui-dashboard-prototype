import { Box, Button, Stack } from "@mui/material";

import { monoFont, tacticalSurface } from "../tactical";

type PanelActionsProps = {
  continueLabel?: string;
  accent: string;
  onClose: () => void;
};

export default function PanelActions({
  continueLabel = "Continue",
  accent,
  onClose,
}: PanelActionsProps) {
  return (
    <Box
      sx={{
        bgcolor: "#161616",
        borderTop: `1px solid ${tacticalSurface.hairline}`,
        px: 1.5,
        py: 1.25,
        flexShrink: 0,
      }}
    >
      <Stack direction="row" justifyContent="flex-end" spacing={0.5} alignItems="center">
        <Button
          size="small"
          onClick={onClose}
          sx={{
            fontFamily: monoFont,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            height: 32,
            px: 1.25,
            color: "text.secondary",
            borderRadius: 0.5,
            "&:hover": {
              color: "text.primary",
              bgcolor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          size="small"
          sx={{
            fontFamily: monoFont,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            height: 32,
            px: 1.5,
            minWidth: 120,
            bgcolor: accent,
            color: "#0f0f0f",
            borderRadius: 0.5,
            boxShadow: `0 0 0 1px ${accent}99 inset, 0 4px 14px ${accent}26`,
            "&:hover": {
              bgcolor: accent,
              filter: "brightness(1.1)",
              boxShadow: `0 0 0 1px ${accent} inset, 0 6px 18px ${accent}40`,
            },
          }}
        >
          {continueLabel}
        </Button>
      </Stack>
    </Box>
  );
}
