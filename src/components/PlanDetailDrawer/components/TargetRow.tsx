import { Box, Typography } from "@mui/material";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import { monoFont } from "../../../theme";
import { pad2 } from "../../../utils/formatting";
import type { Target } from "../../../types";
import { hasCoordinates } from "../utils";
import MissingCoordinatesIcon from "./MissingCoordinatesIcon";

type TargetRowProps = {
  target: Target;
  index: number;
  selected: boolean;
  accent: string;
  onSelect: () => void;
};

export default function TargetRow({
  target,
  index,
  selected,
  accent,
  onSelect,
}: TargetRowProps) {
  const missingCoords = !hasCoordinates(target);

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 0.7,
        px: 1,
        borderRadius: 0.5,
        cursor: "pointer",
        bgcolor: selected ? `${accent}1f` : "transparent",
        border: `1px solid ${selected ? `${accent}66` : "transparent"}`,
        transition: "background-color 140ms ease, border-color 160ms ease",
        "&:hover": {
          bgcolor: selected ? `${accent}26` : "rgba(255,255,255,0.04)",
          borderColor: selected ? `${accent}88` : "rgba(255,255,255,0.08)",
        },
      }}
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          bgcolor: "rgba(255,255,255,0.04)",
          color: "text.secondary",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <GpsFixedIcon sx={{ fontSize: 12 }} />
      </Box>

      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 10,
          letterSpacing: 1,
          fontWeight: 700,
          color: "text.secondary",
          flexShrink: 0,
        }}
      >
        T-{pad2(index + 1)}
      </Typography>

      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 11,
          letterSpacing: 0.8,
          fontWeight: 600,
          color: "text.primary",
          minWidth: 0,
          flex: 1,
        }}
        noWrap
      >
        {target.name.toUpperCase()}
      </Typography>

      {missingCoords && <MissingCoordinatesIcon />}
    </Box>
  );
}
