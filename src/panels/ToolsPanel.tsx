import { Box, Button, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GridViewIcon from "@mui/icons-material/GridView";
import LayersIcon from "@mui/icons-material/Layers";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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

const toolGroups: Array<{ title: string; tools: ToolEntry[] }> = [
  {
    title: "FILE",
    tools: [
      { icon: <SaveIcon sx={{ fontSize: 15 }} />, label: "Save" },
      { icon: <DownloadIcon sx={{ fontSize: 15 }} />, label: "Export" },
      { icon: <ShareIcon sx={{ fontSize: 15 }} />, label: "Share" },
    ],
  },
  {
    title: "VIEW",
    tools: [
      { icon: <GridViewIcon sx={{ fontSize: 15 }} />, label: "Toggle Grid" },
      { icon: <VisibilityIcon sx={{ fontSize: 15 }} />, label: "Show Layers" },
      { icon: <VisibilityOffIcon sx={{ fontSize: 15 }} />, label: "Hide Layers" },
      { icon: <RestartAltIcon sx={{ fontSize: 15 }} />, label: "Reset View" },
    ],
  },
  {
    title: "PLAN TOOLS",
    tools: [
      { icon: <LayersIcon sx={{ fontSize: 15 }} />, label: "Layers" },
      { icon: <FilterAltIcon sx={{ fontSize: 15 }} />, label: "Filters" },
      { icon: <SearchIcon sx={{ fontSize: 15 }} />, label: "Search" },
      { icon: <SettingsIcon sx={{ fontSize: 15 }} />, label: "Settings" },
      { icon: <DeleteIcon sx={{ fontSize: 15 }} />, label: "Delete" },
    ],
  },
];

const toolButtonSx = {
  justifyContent: "flex-start",
  textTransform: "uppercase",
  fontFamily: monoFont,
  fontSize: 11.5,
  letterSpacing: 1.3,
  fontWeight: 700,
  color: "text.secondary",
  borderRadius: 0.5,
  px: 1,
  py: 0.5,
  border: "1px solid transparent",
  "& .MuiButton-startIcon": { mr: 0.85, ml: 0 },
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.04)",
    color: "text.primary",
    borderColor: "rgba(255,255,255,0.12)",
  },
} as const;

export default function ToolsPanel({ onClose }: ToolsPanelProps) {
  return (
    <>
      <ClassificationBanner
        accent={ACCENT}
        label="TOOLS"
        status="OPS"
        statusActive
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 1.5,
          ...scrollbarTacticalSx,
        }}
      >
        <Stack spacing={1.25}>
          {toolGroups.map((group) => (
            <TacticalSection key={group.title} label={group.title} accent={ACCENT}>
              <Stack spacing={0.4}>
                {group.tools.map((tool) => (
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
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          bgcolor: "#161616",
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
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              height: 32,
              px: 1.5,
              color: "text.secondary",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 0.5,
              "&:hover": {
                color: "text.primary",
                bgcolor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.25)",
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
