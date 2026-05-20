import { Box } from "@mui/material";
import type { PanelKey, WeaponPlan } from "../types";

import { tacticalSurface } from "../tactical";

import OpenPlansPanel from "../panels/OpenPlansPanel";
import CreatePanel from "../panels/CreatePanel";
import LibraryPanel from "../panels/LibraryPanel";
import ToolsPanel from "../panels/ToolsPanel";
import ReviewPanel from "../panels/ReviewPanel";

type WizardPanelProps = {
  selectedPanel: PanelKey;
  selectedPlan: WeaponPlan | null;
  plans: WeaponPlan[];
  onSelectPlan: (plan: WeaponPlan) => void;
  onClosePlan: (planId: string) => void;
  onCloseAllPlans: () => void;
  onOpenPlans: (planIds: string[]) => void;
  onOpenLibrary: () => void;
  onOpenAssociation: (planId: string) => void;
  onDisassociate: (fromPlanId: string, refId: string) => void;
  onClose: () => void;
};

export default function WizardPanel({
  selectedPanel,
  selectedPlan,
  plans,
  onSelectPlan,
  onClosePlan,
  onCloseAllPlans,
  onOpenPlans,
  onOpenLibrary,
  onOpenAssociation,
  onDisassociate,
  onClose,
}: WizardPanelProps) {
  return (
    <Box
      sx={{
        bgcolor: tacticalSurface.panel,
        border: "1px solid #3a3a3a",
        borderRadius: 0.5,
        boxShadow: "12px 0 32px rgba(0,0,0,0.45)",
        height: "calc(100vh - 112px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        key={selectedPanel}
        sx={{
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          animation: "contentSwap 180ms ease-out",
          "@keyframes contentSwap": {
            from: {
              opacity: 0,
              transform: "translateX(-8px)",
            },
            to: {
              opacity: 1,
              transform: "translateX(0)",
            },
          },
        }}
      >
        {selectedPanel === "map" && (
          <OpenPlansPanel
            plans={plans}
            selectedPlan={selectedPlan}
            onSelectPlan={onSelectPlan}
            onClosePlan={onClosePlan}
            onCloseAllPlans={onCloseAllPlans}
            onOpenLibrary={onOpenLibrary}
            onOpenAssociation={onOpenAssociation}
            onDisassociate={onDisassociate}
          />
        )}
        {selectedPanel === "create" && <CreatePanel onClose={onClose} />}
        {selectedPanel === "library" && (
          <LibraryPanel plans={plans} onOpenPlans={onOpenPlans} onClose={onClose} />
        )}
        {selectedPanel === "tools" && <ToolsPanel onClose={onClose} />}
        {selectedPanel === "review" && <ReviewPanel onClose={onClose} />}
      </Box>
    </Box>
  );
}
