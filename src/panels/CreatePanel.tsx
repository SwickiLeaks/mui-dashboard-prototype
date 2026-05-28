import { Box, Typography } from "@mui/material";

import {
  ClassificationBanner,
  appAccent,
  monoFont,
  scrollbarTacticalSx,
} from "../theme";

type CreatePanelProps = {
  onClose: () => void;
};

/**
 * Empty template panel. Drop new "create plan" UI into the body — the banner
 * and scroll/padding chrome are already in place.
 */
export default function CreatePanel({ onClose }: CreatePanelProps) {
  return (
    <>
      <ClassificationBanner
        accent={appAccent}
        label="Create"
        onClose={onClose}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 2,
          ...scrollbarTacticalSx,
        }}
      >
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 11,
            letterSpacing: 1.4,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          CREATE PANEL // PLACEHOLDER
        </Typography>
      </Box>
    </>
  );
}
