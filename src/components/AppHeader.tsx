import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import AppsIcon from "@mui/icons-material/Apps";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import FolderIcon from "@mui/icons-material/Folder";

import PublicIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TuneIcon from "@mui/icons-material/Tune";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { selectionStyles } from "../theme";
import { monoFont } from "../tactical";
import type { ExcavationPlan, PanelKey } from "../types";

const controls: Array<{
  key: PanelKey;
  label: string;
  icon: React.ReactNode;
}> = [
  { key: "map", label: "Open Plans", icon: <PublicIcon /> },
  { key: "create", label: "Create", icon: <AddIcon /> },
  { key: "library", label: "Library", icon: <BookmarkIcon /> },
  { key: "tools", label: "Tools", icon: <TuneIcon /> },
  { key: "review", label: "Review", icon: <AutoAwesomeIcon /> },
];

type AppHeaderProps = {
  expandedControls: boolean;
  selectedPanel: PanelKey | null;
  selectedPlan: ExcavationPlan | null;
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

          <Box
            aria-hidden={expandedControls}
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              maxWidth: expandedControls ? 0 : 200,
              opacity: expandedControls ? 0 : 1,
              transform: expandedControls ? "translateX(-8px)" : "translateX(0)",
              transition:
                "max-width 260ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease, transform 240ms cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: expandedControls ? "none" : "auto",
              "& > * + *": { ml: 1 },
            }}
          >
            <PrimaryIconButton>
              <AssignmentIcon fontSize="small" />
            </PrimaryIconButton>

            <PrimaryIconButton>
              <PublicIcon fontSize="small" />
            </PrimaryIconButton>

            <PrimaryIconButton>
              <BuildIcon fontSize="small" />
            </PrimaryIconButton>
          </Box>

          <Box
            sx={{
              ml: expandedControls ? 0 : 1,
              transition: "margin-left 240ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <PrimaryIconButton active={expandedControls} onClick={handleFolderClick}>
              <FolderIcon fontSize="small" />
            </PrimaryIconButton>
          </Box>

          <Box
            aria-hidden={!expandedControls}
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              ml: expandedControls ? 1 : 0,
              maxWidth: expandedControls ? 800 : 0,
              opacity: expandedControls ? 1 : 0,
              transform: expandedControls ? "translateX(0)" : "translateX(-8px)",
              transition:
                "max-width 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 220ms ease, transform 240ms cubic-bezier(0.4, 0, 0.2, 1), margin-left 240ms cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: expandedControls ? "auto" : "none",
            }}
          >
            <ExpandedControlBar
              selectedPanel={selectedPanel}
              onSelectedPanelChange={onSelectedPanelChange}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "40vw",
            textAlign: "center",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              flexShrink: 0,
              bgcolor: selectedPlan ? "#a5d6a7" : "rgba(255,255,255,0.2)",
              boxShadow: selectedPlan ? "0 0 8px #a5d6a7cc" : "none",
            }}
          />
          <Typography
            sx={{
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1.6,
              color: selectedPlan ? "text.primary" : "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {(selectedPlan?.name ?? "NO PLAN SELECTED").toUpperCase()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function PrimaryIconButton({
  active = false,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 38,
        height: 38,
        borderRadius: 0.5,
        bgcolor: active ? "#2a2a2a" : "#1a1a1a",
        border: "1px solid",
        borderColor: active ? selectionStyles.border : "#2a2a2a",
        color: active ? "text.primary" : "text.secondary",
        boxShadow: active ? selectionStyles.ring : "none",
        transition:
          "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease",

        "&:hover": {
          bgcolor: active ? "#2a2a2a" : "#222",
          color: "text.primary",
          borderColor: active ? selectionStyles.border : "#3a3a3a",
          transform: "translateY(-1px)",
        },
      }}
    >
      {children}
    </IconButton>
  );
}

function ExpandedControlBar({
  selectedPanel,
  onSelectedPanelChange,
}: {
  selectedPanel: PanelKey | null;
  onSelectedPanelChange: React.Dispatch<React.SetStateAction<PanelKey | null>>;
}) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center">
      {controls.map((control) => {
        const selected = selectedPanel === control.key;

        return (
          <Button
            key={control.key}
            startIcon={control.icon}
            onClick={() =>
              onSelectedPanelChange((current) =>
                current === control.key ? null : control.key
              )
            }
            sx={{
              height: 38,
              borderRadius: 0.5,
              px: 1.25,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              fontFamily: monoFont,
              fontSize: 11.5,
              letterSpacing: 1.4,
              color: selected ? "text.primary" : "text.secondary",
              bgcolor: selected ? "#2a2a2a" : "#1a1a1a",
              border: "1px solid",
              borderColor: selected ? selectionStyles.border : "#2a2a2a",
              boxShadow: selected ? selectionStyles.ring : "none",
              fontWeight: 700,
              transition:
                "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease",

              "& .MuiButton-startIcon": {
                mr: 0.75,
              },

              "&:hover": {
                bgcolor: selected ? "#2a2a2a" : "#222",
                color: "text.primary",
                borderColor: selected ? selectionStyles.border : "#3a3a3a",
              },
            }}
          >
            {control.label}
          </Button>
        );
      })}
    </Stack>
  );
}
