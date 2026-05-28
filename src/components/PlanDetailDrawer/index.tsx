import { Box } from "@mui/material";

import { ClassificationBanner, appAccent, tacticalSurface } from "../../theme";
import type { WeaponPlan } from "../../types";

type PlanDetailDrawerProps = {
  plan: WeaponPlan;
  plans: WeaponPlan[];
  onClose: () => void;
  onUpdatePlan: (plan: WeaponPlan) => void;
};

export default function PlanDetailDrawer({ onClose }: PlanDetailDrawerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: tacticalSurface.panel,
        borderLeft: "1px solid #3a3a3a",
        boxShadow: "-12px 0 32px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      <ClassificationBanner
        accent={appAccent}
        label="Weapon Plan Editor"
        status="Active"
        statusActive
        onClose={onClose}
      />

      <Box sx={{ flex: 1, minHeight: 0 }} />
    </Box>
  );
}
