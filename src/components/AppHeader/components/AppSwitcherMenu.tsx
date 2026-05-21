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
            boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 104px)",
          gap: 0.75,
          p: 1,
        }}
      >
        {apps.map((app) => (
          <ButtonBase
            key={app.key}
            onClick={onClose}
            sx={{
              height: 84,
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
              "&:hover": {
                bgcolor: "#222",
                borderColor: appAccent,
                color: "text.primary",
              },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                color: appAccent,
                "& > svg": { fontSize: 22 },
              }}
            >
              {app.icon}
            </Box>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 9.5,
                letterSpacing: 1.2,
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
