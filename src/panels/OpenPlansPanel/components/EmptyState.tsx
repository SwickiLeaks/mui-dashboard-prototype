import { Box, Button, Stack, Typography } from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import { monoFont, tacticalSurface } from "../../../theme";
import { PANEL_ACCENT } from "../styles";

type EmptyStateProps = {
  onOpenLibrary: () => void;
};

export default function EmptyState({ onOpenLibrary }: EmptyStateProps) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 360,
          p: 3,
          bgcolor: tacticalSurface.card,
          border: `1px solid ${tacticalSurface.border}`,
          borderRadius: 0.5,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            background: `repeating-linear-gradient(135deg, ${PANEL_ACCENT} 0 1px, transparent 1px 7px)`,
            pointerEvents: "none",
          }}
        />

        <Stack
          spacing={2}
          alignItems="center"
          sx={{ position: "relative", textAlign: "center" }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 0.5,
              display: "grid",
              placeItems: "center",
              bgcolor: `${PANEL_ACCENT}1c`,
              color: PANEL_ACCENT,
              border: `1px solid ${PANEL_ACCENT}55`,
            }}
          >
            <BookmarkIcon sx={{ fontSize: 25 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 11,
                letterSpacing: 1.8,
                fontWeight: 700,
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              WORKSPACE STANDBY
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 0.4,
                lineHeight: 1.3,
              }}
            >
              No plans active
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
                mt: 0.75,
                lineHeight: 1.55,
              }}
            >
              Browse the Library to deploy plans into the active workspace.
            </Typography>
          </Box>

          <Button
            startIcon={<BookmarkIcon sx={{ fontSize: 15 }} />}
            onClick={onOpenLibrary}
            sx={{
              fontFamily: monoFont,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: "#0f0f0f",
              bgcolor: PANEL_ACCENT,
              border: `1px solid ${PANEL_ACCENT}`,
              borderRadius: 0.5,
              px: 2,
              py: 0.75,
              minWidth: 180,
              "& .MuiButton-startIcon": { mr: 0.85 },
              "&:hover": {
                bgcolor: PANEL_ACCENT,
                filter: "brightness(1.1)",
              },
            }}
          >
            Open Library
          </Button>

          <Stack direction="row" spacing={0.75} alignItems="center">
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 10,
                letterSpacing: 1.4,
                color: "text.secondary",
              }}
            >
              OR PRESS
            </Typography>
            <Box
              component="span"
              sx={{
                px: 0.85,
                py: 0.15,
                borderRadius: 0.5,
                fontFamily: monoFont,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.4,
                color: "text.secondary",
                bgcolor: "#242424",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              F3
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
