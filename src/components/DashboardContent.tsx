import { Box } from "@mui/material";
import type { ExcavationPlan } from "../types";

type DashboardContentProps = {
  selectedPlan: ExcavationPlan | null;
};

export default function DashboardContent({ selectedPlan }: DashboardContentProps) {
  return (
    <Box
      aria-label={selectedPlan ? `Dashboard for ${selectedPlan.name}` : "Dashboard"}
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: `url("/world.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
