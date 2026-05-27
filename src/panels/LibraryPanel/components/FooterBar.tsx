import { Box, Button, Stack, Typography } from "@mui/material";

import { monoFont, tacticalSurface } from "../../../theme";

type FooterBarProps = {
  accent: string;
  hasSelection: boolean;
  count: number;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function FooterBar({
  accent,
  hasSelection,
  count,
  onCancel,
  onConfirm,
}: FooterBarProps) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        position: "relative",
        bgcolor: "#161616",
        borderTop: `1px solid ${tacticalSurface.hairline}`,
        px: 2,
        py: 1.5,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1.25}
      >
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{ minWidth: 0, flex: 1 }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 0.5,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              bgcolor: hasSelection ? `${accent}1f` : "rgba(255,255,255,0.04)",
              border: `1px solid ${
                hasSelection ? `${accent}55` : "rgba(255,255,255,0.08)"
              }`,
              color: hasSelection ? accent : "text.secondary",
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1,
              transition:
                "background-color 220ms ease, border-color 220ms ease, color 220ms ease",
            }}
          >
            {count}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 10.5,
                letterSpacing: 1.4,
                fontWeight: 700,
                color: hasSelection ? "text.primary" : "text.secondary",
              }}
              noWrap
            >
              {hasSelection
                ? `PLAN${count === 1 ? "" : "S"} SELECTED`
                : "NOTHING SELECTED"}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
                lineHeight: 1.3,
              }}
              noWrap
            >
              {hasSelection
                ? "Deploy into active workspace"
                : "Tap items to multi-select"}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
          <Button
            size="small"
            onClick={onCancel}
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
            disabled={!hasSelection}
            onClick={onConfirm}
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
              boxShadow: `0 0 0 1px ${accent}99 inset`,
              transition:
                "background-color 160ms ease, box-shadow 160ms ease, filter 160ms ease",
              "&:hover": {
                bgcolor: accent,
                filter: "brightness(1.1)",
                boxShadow: `0 0 0 1px ${accent} inset`,
              },
              "&:disabled": {
                bgcolor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.3)",
                boxShadow: "none",
              },
            }}
          >
            {count > 1 ? "Open Plans" : "Open Plan"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
