import { Box, ButtonBase, Popover, Typography } from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import HubIcon from "@mui/icons-material/Hub";
import KeyIcon from "@mui/icons-material/Key";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

import { appAccent, monoFont, tacticalSurface } from "../../../theme";

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
  { key: "data", label: "Data Management", icon: <FolderIcon /> },
  { key: "edge", label: "Edge Compute", icon: <HubIcon /> },
  { key: "nifi", label: "NiFi", icon: <WaterDropIcon /> },
  { key: "keycloak", label: "KeyCloak", icon: <KeyIcon /> },
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
            minWidth: 248,
            bgcolor: tacticalSurface.card,
            border: `1px solid ${tacticalSurface.border}`,
            borderRadius: 2,
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 1,
          borderBottom: `1px solid ${tacticalSurface.hairline}`,
        }}
      >
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 11.5,
            letterSpacing: 0.3,
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          Applications
        </Typography>
      </Box>

      <Box sx={{ py: 0.5 }}>
        {apps.map((app) => (
          <ButtonBase
            key={app.key}
            onClick={onClose}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              gap: 1.25,
              px: 1.5,
              py: 1,
              color: "text.secondary",
              transition: "background-color 140ms ease, color 140ms ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
                color: "text.primary",
              },
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                color: appAccent,
                "& > svg": { fontSize: 20 },
              }}
            >
              {app.icon}
            </Box>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: 0.1,
                color: "inherit",
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
