import { Box } from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

type ReleaseTriangleIconProps = {
  size?: number;
};

/**
 * Outlined triangle with a centered dot — used to represent a release
 * placement marker. Dot is positioned at the triangle's optical center
 * (slightly below geometric center).
 */
export default function ReleaseTriangleIcon({
  size = 18,
}: ReleaseTriangleIconProps) {
  const dotSize = Math.max(3, Math.round(size / 6));
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
      }}
    >
      <ChangeHistoryIcon sx={{ fontSize: size }} />
      <Box
        sx={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          bgcolor: "currentColor",
        }}
      />
    </Box>
  );
}
