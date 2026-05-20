import { Box, IconButton, Stack } from "@mui/material";

import CalculateIcon from "@mui/icons-material/Calculate";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { monoFont } from "../../../theme";
import { WARNING_COLOR } from "../styles";
import ReleaseTriangleIcon from "./ReleaseTriangleIcon";

type PlanDesignationToolbarProps = {
  accent: string;
  warningCount: number;
};

const noop = () => {};

export default function PlanDesignationToolbar({
  accent,
  warningCount,
}: PlanDesignationToolbarProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 0.25 }}
    >
      <Stack direction="row" spacing={0.75}>
        <ToolbarButton accent={accent} title="Place release" onClick={noop}>
          <ReleaseTriangleIcon size={18} />
        </ToolbarButton>
        <ToolbarButton accent={accent} title="Place target" onClick={noop}>
          <GpsFixedIcon sx={{ fontSize: 18 }} />
        </ToolbarButton>
      </Stack>

      <Stack direction="row" spacing={0.75} alignItems="center">
        <WarningIndicator count={warningCount} />
        <ToolbarButton accent={accent} title="Calculate plan" onClick={noop}>
          <CalculateIcon sx={{ fontSize: 18 }} />
        </ToolbarButton>
      </Stack>
    </Stack>
  );
}

function ToolbarButton({
  accent,
  title,
  onClick,
  children,
}: {
  accent: string;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <IconButton
      onClick={onClick}
      title={title}
      sx={{
        width: 32,
        height: 32,
        borderRadius: 0.5,
        color: "rgba(255,255,255,0.7)",
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        transition:
          "background-color 140ms ease, border-color 160ms ease, color 160ms ease",
        "&:hover": {
          color: accent,
          bgcolor: `${accent}1c`,
          borderColor: `${accent}66`,
        },
      }}
    >
      {children}
    </IconButton>
  );
}

function WarningIndicator({ count }: { count: number }) {
  const dim = count === 0;
  return (
    <Box
      title={
        count > 0
          ? `${count} ${count === 1 ? "item" : "items"} missing coordinates`
          : "No warnings"
      }
      sx={{
        position: "relative",
        width: 32,
        height: 32,
        borderRadius: 0.5,
        display: "grid",
        placeItems: "center",
        color: dim ? "rgba(255,183,77,0.45)" : WARNING_COLOR,
        bgcolor: dim ? "rgba(255,255,255,0.02)" : `${WARNING_COLOR}14`,
        border: `1px solid ${
          dim ? "rgba(255,255,255,0.08)" : `${WARNING_COLOR}55`
        }`,
      }}
    >
      <WarningAmberIcon sx={{ fontSize: 18 }} />
      {count > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: -6,
            right: -6,
            minWidth: 17,
            height: 17,
            px: 0.4,
            borderRadius: "9px",
            bgcolor: WARNING_COLOR,
            color: "#1a1a1a",
            fontFamily: monoFont,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.3,
            display: "grid",
            placeItems: "center",
            border: "2px solid #1a1a1a",
            lineHeight: 1,
          }}
        >
          {count}
        </Box>
      )}
    </Box>
  );
}
