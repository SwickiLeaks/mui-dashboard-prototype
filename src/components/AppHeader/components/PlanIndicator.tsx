import { Box, Typography } from "@mui/material";

import { monoFont } from "../../../theme";
import type { WeaponPlan } from "../../../types";

type PlanIndicatorProps = {
  plan: WeaponPlan | null;
};

/** Center-of-header status: accent dot + plan name (or "NO PLAN SELECTED"). */
export default function PlanIndicator({ plan }: PlanIndicatorProps) {
  return (
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
      <Typography
        sx={{
          fontFamily: monoFont,
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: 0.2,
          color: plan ? "text.primary" : "text.secondary",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {plan?.name ?? "No plan selected"}
      </Typography>
    </Box>
  );
}
