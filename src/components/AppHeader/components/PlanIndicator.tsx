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
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          flexShrink: 0,
          bgcolor: plan ? "#90caf9" : "rgba(255,255,255,0.2)",
          boxShadow: plan ? "0 0 8px #90caf9cc" : "none",
        }}
      />
      <Typography
        sx={{
          fontFamily: monoFont,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 1.6,
          color: plan ? "text.primary" : "text.secondary",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {(plan?.name ?? "NO PLAN SELECTED").toUpperCase()}
      </Typography>
    </Box>
  );
}
