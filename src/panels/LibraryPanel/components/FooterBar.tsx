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
        bgcolor: "transparent",
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
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              bgcolor: hasSelection ? `${accent}2b` : "rgba(255,255,255,0.05)",
              color: hasSelection ? accent : "text.secondary",
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1,
              transition: "background-color 220ms ease, color 220ms ease",
            }}
          >
            {count}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 13,
                letterSpacing: 0.2,
                fontWeight: 700,
                color: hasSelection ? "text.primary" : "text.secondary",
              }}
              noWrap
            >
              {hasSelection
                ? `${count} plan${count === 1 ? "" : "s"} selected`
                : "Nothing selected"}
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
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.1,
              textTransform: "none",
              height: 36,
              px: 1.75,
              color: "text.secondary",
              borderRadius: 2,
              "&:hover": {
                color: "text.primary",
                bgcolor: "rgba(255,255,255,0.06)",
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
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.1,
              textTransform: "none",
              height: 36,
              px: 2.25,
              minWidth: 120,
              bgcolor: accent,
              color: "#0f1115",
              borderRadius: 2,
              transition: "background-color 160ms ease, filter 160ms ease",
              "&:hover": {
                bgcolor: accent,
                filter: "brightness(1.08)",
              },
              "&:disabled": {
                bgcolor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.3)",
              },
            }}
          >
            {count > 1 ? "Open plans" : "Open plan"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
