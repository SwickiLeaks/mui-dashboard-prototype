import { Box, Button, Stack } from "@mui/material";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import PlaceIcon from "@mui/icons-material/Place";
import PolylineIcon from "@mui/icons-material/Polyline";
import RadarIcon from "@mui/icons-material/Radar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RouteIcon from "@mui/icons-material/Route";
import TableChartIcon from "@mui/icons-material/TableChart";
import TimelineIcon from "@mui/icons-material/Timeline";

import {
  ClassificationBanner,
  TacticalSection,
  appAccent,
  monoFont,
  scrollbarTacticalSx,
  tacticalSurface,
} from "../theme";

type ToolsPanelProps = {
  onClose: () => void;
};

const ACCENT = appAccent;

type ToolEntry = { icon: React.ReactNode; label: string };

const editors: ToolEntry[] = [
  { icon: <AccountTreeIcon sx={{ fontSize: 15 }} />, label: "COA Builder" },
  { icon: <RadarIcon sx={{ fontSize: 15 }} />, label: "EWDS OOB" },
  { icon: <PlaceIcon sx={{ fontSize: 15 }} />, label: "Local Points" },
  { icon: <TableChartIcon sx={{ fontSize: 15 }} />, label: "Route Tabular" },
  { icon: <RouteIcon sx={{ fontSize: 15 }} />, label: "Routes" },
  { icon: <PolylineIcon sx={{ fontSize: 15 }} />, label: "Shpare Editor" },
  { icon: <GpsFixedIcon sx={{ fontSize: 15 }} />, label: "Target Editor" },
  { icon: <TimelineIcon sx={{ fontSize: 15 }} />, label: "Timeline" },
  { icon: <EditNoteIcon sx={{ fontSize: 15 }} />, label: "VTSE" },
  { icon: <RocketLaunchIcon sx={{ fontSize: 15 }} />, label: "Weapons" },
];

const toolButtonSx = {
  justifyContent: "flex-start",
  fontFamily: monoFont,
  fontSize: 13,
  letterSpacing: 0.2,
  fontWeight: 500,
  textTransform: "none",
  color: "text.secondary",
  borderRadius: 2,
  px: 1.25,
  py: 0.85,
  "& .MuiButton-startIcon": { mr: 1, ml: 0 },
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.06)",
    color: "text.primary",
  },
} as const;

export default function ToolsPanel({ onClose }: ToolsPanelProps) {
  return (
    <>
      <ClassificationBanner
        accent={ACCENT}
        label="Tools"
        status="Ops"
        statusActive
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
        <TacticalSection label="Editors" accent={ACCENT}>
          <Stack spacing={0.4}>
            {editors.map((tool) => (
              <Button
                key={tool.label}
                startIcon={tool.icon}
                fullWidth
                sx={toolButtonSx}
              >
                {tool.label}
              </Button>
            ))}
          </Stack>
        </TacticalSection>
      </Box>

      <Box
        sx={{
          bgcolor: "transparent",
          borderTop: `1px solid ${tacticalSurface.hairline}`,
          px: 1.5,
          py: 1.25,
          flexShrink: 0,
        }}
      >
        <Stack direction="row" justifyContent="flex-end">
          <Button
            size="small"
            onClick={onClose}
            sx={{
              fontFamily: monoFont,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.1,
              textTransform: "none",
              height: 36,
              px: 2,
              color: "text.secondary",
              borderRadius: 2,
              "&:hover": {
                color: "text.primary",
                bgcolor: "rgba(255,255,255,0.06)",
              },
            }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </>
  );
}
