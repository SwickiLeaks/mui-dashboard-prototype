import { Box, IconButton, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { monoFont } from "../../../theme";
import { pad2 } from "../../../utils/formatting";
import type { Release } from "../../../types";
import { hasCoordinates } from "../utils";
import MissingCoordinatesIcon from "./MissingCoordinatesIcon";

type ReleaseRowProps = {
  release: Release;
  index: number;
  targetCount: number;
  expanded: boolean;
  selected: boolean;
  accent: string;
  onToggle: () => void;
  onSelect: () => void;
};

export default function ReleaseRow({
  release,
  index,
  targetCount,
  expanded,
  selected,
  accent,
  onToggle,
  onSelect,
}: ReleaseRowProps) {
  const missingCoords = !hasCoordinates(release);

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 0.9,
        pl: 0.6,
        pr: 1,
        borderRadius: 0.5,
        cursor: "pointer",
        bgcolor: selected ? `${accent}1f` : "rgba(255,255,255,0.02)",
        border: `1px solid ${
          selected ? `${accent}66` : "rgba(255,255,255,0.06)"
        }`,
        boxShadow: selected ? `0 0 0 1px ${accent}33` : "none",
        transition:
          "background-color 140ms ease, border-color 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          bgcolor: selected ? `${accent}26` : "rgba(255,255,255,0.05)",
          borderColor: selected ? `${accent}88` : "rgba(255,255,255,0.14)",
        },
      }}
    >
      <IconButton
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        sx={{
          width: 26,
          height: 26,
          borderRadius: 0.5,
          color: "text.secondary",
          flexShrink: 0,
          "&:hover": {
            color: "text.primary",
            bgcolor: "rgba(255,255,255,0.06)",
          },
        }}
      >
        {expanded ? (
          <ExpandMoreIcon sx={{ fontSize: 17 }} />
        ) : (
          <ChevronRightIcon sx={{ fontSize: 17 }} />
        )}
      </IconButton>

      <Box
        sx={{
          minWidth: 30,
          height: 26,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          fontFamily: monoFont,
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: 0.6,
          flexShrink: 0,
          bgcolor: `${accent}1c`,
          border: `1px solid ${accent}55`,
          color: accent,
        }}
      >
        {pad2(index + 1)}
      </Box>

      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 11.5,
          letterSpacing: 1.1,
          fontWeight: 700,
          color: "text.primary",
          minWidth: 0,
          flex: 1,
        }}
        noWrap
      >
        {release.name.toUpperCase()}
      </Typography>

      {missingCoords && <MissingCoordinatesIcon />}

      <Box
        sx={{
          minWidth: 28,
          height: 22,
          px: 0.75,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          fontFamily: monoFont,
          fontSize: 10,
          fontWeight: 700,
          color: "text.secondary",
          bgcolor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        {targetCount}
      </Box>
    </Box>
  );
}
