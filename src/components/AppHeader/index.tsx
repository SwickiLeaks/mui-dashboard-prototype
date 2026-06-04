import { useState } from "react";

import { AppBar, Box, Divider, Stack, Toolbar } from "@mui/material";

import AppsIcon from "@mui/icons-material/Apps";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import FolderIcon from "@mui/icons-material/Folder";
import LayersIcon from "@mui/icons-material/Layers";
import PublicIcon from "@mui/icons-material/Public";
import StraightenIcon from "@mui/icons-material/Straighten";

import type { PanelKey, WeaponPlan } from "../../types";

import AppSwitcherMenu from "./components/AppSwitcherMenu";
import ExpandedControlBar from "./components/ExpandedControlBar";
import PlanIndicator from "./components/PlanIndicator";
import PrimaryIconButton from "./components/PrimaryIconButton";
import UserAvatar from "./components/UserAvatar";

type AppHeaderProps = {
  expandedControls: boolean;
  selectedPanel: PanelKey | null;
  selectedPlan: WeaponPlan | null;
  onExpandedControlsChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectedPanelChange: React.Dispatch<React.SetStateAction<PanelKey | null>>;
};

const SLOT_TRANSITION =
  "max-width 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 220ms ease, margin-right 280ms cubic-bezier(0.4, 0, 0.2, 1)";

type IconSlotProps = {
  visible: boolean;
  collapseGap: boolean;
  children: React.ReactNode;
};

function IconSlot({ visible, collapseGap, children }: IconSlotProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        overflow: "hidden",
        maxWidth: visible ? 38 : 0,
        opacity: visible ? 1 : 0,
        mr: visible && !collapseGap ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: SLOT_TRANSITION,
      }}
    >
      {children}
    </Box>
  );
}

export default function AppHeader({
  expandedControls,
  selectedPanel,
  selectedPlan,
  onExpandedControlsChange,
  onSelectedPanelChange,
}: AppHeaderProps) {
  const folderActive = expandedControls;
  const toolsActive = selectedPanel === "tools";
  const workflowActive = selectedPanel === "workflow";

  // Only the folder collapses the icon row to reveal the expanded control
  // bar. Every other top-level icon just highlights in place when selected.
  const collapsed = folderActive;

  const [appMenuAnchor, setAppMenuAnchor] = useState<HTMLElement | null>(null);
  const appMenuOpen = Boolean(appMenuAnchor);

  const handleAppsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAppMenuAnchor((current) => (current ? null : event.currentTarget));
  };

  const handleAppMenuClose = () => {
    setAppMenuAnchor(null);
  };

  const handleFolderClick = () => {
    if (folderActive) {
      onExpandedControlsChange(false);
      onSelectedPanelChange(null);
    } else {
      onSelectedPanelChange(null);
      onExpandedControlsChange(true);
    }
  };

  const togglePanel = (key: PanelKey) => () => {
    onExpandedControlsChange(false);
    onSelectedPanelChange((current) => (current === key ? null : key));
  };

  return (
    <AppBar position="sticky" elevation={1} sx={{ zIndex: 20 }}>
      <Toolbar
        sx={{
          minHeight: 64,
          position: "relative",
          bgcolor: "#121212",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PrimaryIconButton active={appMenuOpen} onClick={handleAppsClick}>
            <AppsIcon fontSize="small" />
          </PrimaryIconButton>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, my: 1, borderColor: "#2a2a2a" }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconSlot visible={!collapsed} collapseGap={collapsed}>
              <PrimaryIconButton>
                <PublicIcon fontSize="small" />
              </PrimaryIconButton>
            </IconSlot>
            <IconSlot visible collapseGap={collapsed}>
              <PrimaryIconButton
                title="Browse"
                active={folderActive}
                onClick={handleFolderClick}
              >
                <FolderIcon fontSize="small" />
              </PrimaryIconButton>
            </IconSlot>
            <IconSlot visible={!collapsed} collapseGap={collapsed}>
              <PrimaryIconButton
                title="Tools"
                active={toolsActive}
                onClick={togglePanel("tools")}
              >
                <BuildIcon fontSize="small" />
              </PrimaryIconButton>
            </IconSlot>
            <IconSlot visible={!collapsed} collapseGap={collapsed}>
              <PrimaryIconButton
                title="Workflow"
                active={workflowActive}
                onClick={togglePanel("workflow")}
              >
                <AssignmentIcon fontSize="small" />
              </PrimaryIconButton>
            </IconSlot>
          </Box>

          <ExpandedControlBar
            expanded={expandedControls}
            selectedPanel={selectedPanel}
            onSelectedPanelChange={onSelectedPanelChange}
          />
        </Box>

        <PlanIndicator plan={selectedPlan} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ ml: "auto" }}
        >
          <PrimaryIconButton title="Overlays">
            <LayersIcon fontSize="small" />
          </PrimaryIconButton>
          <PrimaryIconButton title="Weather">
            <CloudIcon fontSize="small" />
          </PrimaryIconButton>
          <PrimaryIconButton title="Analysis Tool">
            <StraightenIcon fontSize="small" />
          </PrimaryIconButton>
          <PrimaryIconButton title="Map Brightness">
            <Brightness6Icon fontSize="small" />
          </PrimaryIconButton>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 0.5, my: 1, borderColor: "#2a2a2a" }}
          />
          <UserAvatar />
        </Stack>
      </Toolbar>

      <AppSwitcherMenu
        anchorEl={appMenuAnchor}
        open={appMenuOpen}
        onClose={handleAppMenuClose}
      />
    </AppBar>
  );
}
