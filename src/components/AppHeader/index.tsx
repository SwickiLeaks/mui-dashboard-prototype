import { AppBar, Box, Divider, Toolbar } from "@mui/material";

import AppsIcon from "@mui/icons-material/Apps";
import FolderIcon from "@mui/icons-material/Folder";

import type { PanelKey, WeaponPlan } from "../../types";

import CollapsedControlBar from "./components/CollapsedControlBar";
import ExpandedControlBar from "./components/ExpandedControlBar";
import PlanIndicator from "./components/PlanIndicator";
import PrimaryIconButton from "./components/PrimaryIconButton";

type AppHeaderProps = {
  expandedControls: boolean;
  selectedPanel: PanelKey | null;
  selectedPlan: WeaponPlan | null;
  onExpandedControlsChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectedPanelChange: React.Dispatch<React.SetStateAction<PanelKey | null>>;
};

export default function AppHeader({
  expandedControls,
  selectedPanel,
  selectedPlan,
  onExpandedControlsChange,
  onSelectedPanelChange,
}: AppHeaderProps) {
  const handleFolderClick = () => {
    onExpandedControlsChange((current) => {
      const next = !current;
      if (!next) {
        onSelectedPanelChange(null);
      }
      return next;
    });
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
          <Box sx={{ mr: 1 }}>
            <PrimaryIconButton>
              <AppsIcon fontSize="small" />
            </PrimaryIconButton>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mr: 1, my: 1, borderColor: "#2a2a2a" }}
          />

          <CollapsedControlBar expanded={expandedControls} />

          <Box
            sx={{
              ml: expandedControls ? 0 : 1,
              transition: "margin-left 240ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <PrimaryIconButton
              active={expandedControls}
              onClick={handleFolderClick}
            >
              <FolderIcon fontSize="small" />
            </PrimaryIconButton>
          </Box>

          <ExpandedControlBar
            expanded={expandedControls}
            selectedPanel={selectedPanel}
            onSelectedPanelChange={onSelectedPanelChange}
          />
        </Box>

        <PlanIndicator plan={selectedPlan} />
      </Toolbar>
    </AppBar>
  );
}
