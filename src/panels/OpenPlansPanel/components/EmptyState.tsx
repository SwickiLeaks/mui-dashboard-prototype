import { Box, Button, Stack, Typography } from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import { appAccent, monoFont } from "../../../theme";

type EmptyStateProps = {
  onOpenLibrary: () => void;
};

const ACCENT = appAccent;

export default function EmptyState({ onOpenLibrary }: EmptyStateProps) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        textAlign: "center",
      }}
    >
      <Stack spacing={2.5} alignItems="center" sx={{ maxWidth: 320 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 0.5,
            display: "grid",
            placeItems: "center",
            color: ACCENT,
            bgcolor: `${ACCENT}14`,
            border: `1px solid ${ACCENT}55`,
          }}
        >
          <BookmarkIcon sx={{ fontSize: 28 }} />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: "text.primary",
              lineHeight: 1.2,
              mb: 0.75,
            }}
          >
            No plans active
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              lineHeight: 1.55,
            }}
          >
            Browse the Library to deploy plans into the workspace.
          </Typography>
        </Box>

        <Button
          startIcon={<BookmarkIcon sx={{ fontSize: 15 }} />}
          onClick={onOpenLibrary}
          sx={{
            fontFamily: monoFont,
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: ACCENT,
            bgcolor: `${ACCENT}14`,
            border: `1px solid ${ACCENT}66`,
            borderRadius: 0.5,
            px: 2.25,
            py: 0.85,
            transition:
              "background-color 160ms ease, border-color 160ms ease",
            "& .MuiButton-startIcon": { mr: 0.85 },
            "&:hover": {
              bgcolor: `${ACCENT}26`,
              borderColor: ACCENT,
            },
          }}
        >
          Open Library
        </Button>

        {/* <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{ mt: 0.5 }}
        >
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
              px: 0.9,
              py: 0.2,
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
        </Stack> */}
      </Stack>
    </Box>
  );
}
