import { Box } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { WARNING_COLOR } from "../styles";

export default function MissingCoordinatesIcon() {
  return (
    <Box
      title="No coordinates defined"
      sx={{
        width: 22,
        height: 22,
        borderRadius: 0.5,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        bgcolor: `${WARNING_COLOR}1f`,
        border: `1px solid ${WARNING_COLOR}66`,
        color: WARNING_COLOR,
      }}
    >
      <WarningAmberIcon sx={{ fontSize: 14 }} />
    </Box>
  );
}
