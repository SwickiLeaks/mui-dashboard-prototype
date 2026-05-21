import { Box, ButtonBase, Popover, Typography } from "@mui/material";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import { appAccent, monoFont } from "../../../theme";

type AppSwitcherMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

type AppEntry = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

const apps: AppEntry[] = [
  { key: "admin", label: "Admin", icon: <AdminPanelSettingsIcon /> },
  {
    key: "fuel",
    label: "Package Fuel Planner",
    icon: <LocalGasStationIcon />,
  },
];

const TILE_SIZE = 92;
const GRID_COLUMNS = 3;
const GRID_GAP = 8;
const GRID_PADDING = 14;
const PANEL_WIDTH =
  GRID_COLUMNS * TILE_SIZE + (GRID_COLUMNS - 1) * GRID_GAP + GRID_PADDING * 2;

export default function AppSwitcherMenu({
  anchorEl,
  open,
  onClose,
}: AppSwitcherMenuProps) {
  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            bgcolor: "#121212",
            border: "1px solid #2a2a2a",
            borderRadius: 0.5,
            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          px: 1.75,
          py: 1.25,
          bgcolor: "#0f0f0f",
          borderBottom: "1px solid #2a2a2a",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 3,
            height: 14,
            bgcolor: appAccent,
            borderRadius: 0.5,
          }}
        />
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 10.5,
            letterSpacing: 1.5,
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          APPLICATIONS
        </Typography>
      </Box>

      <Box
        sx={{
          width: PANEL_WIDTH,
          minHeight: PANEL_WIDTH - 40,
          p: `${GRID_PADDING}px`,
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${TILE_SIZE}px)`,
          gridAutoRows: `${TILE_SIZE}px`,
          gap: `${GRID_GAP}px`,
          alignContent: "flex-start",
        }}
      >
        {apps.map((app) => (
          <ButtonBase
            key={app.key}
            onClick={onClose}
            sx={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              px: 0.75,
              bgcolor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 0.5,
              color: "text.secondary",
              transition:
                "background-color 160ms ease, border-color 160ms ease, color 160ms ease",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 2,
                bgcolor: "transparent",
                transition: "background-color 160ms ease",
              },
              "&:hover": {
                bgcolor: "#222",
                borderColor: appAccent,
                color: "text.primary",
                "&::after": { bgcolor: appAccent },
              },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                color: appAccent,
                "& > svg": { fontSize: 26 },
              }}
            >
              {app.icon}
            </Box>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 9.5,
                letterSpacing: 1.1,
                fontWeight: 700,
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {app.label}
            </Typography>
          </ButtonBase>
        ))}
      </Box>
    </Popover>
  );
}
