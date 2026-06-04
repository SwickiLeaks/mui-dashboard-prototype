import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { ClassificationBanner, appAccent, scrollbarTacticalSx } from "../../theme";
import type { WeaponPlan } from "../../types";

import EmptyState from "./components/EmptyState";
import PlanCard from "./components/PlanCard";
import { closeAllButtonSx } from "./styles";

type OpenPlansPanelProps = {
  plans: WeaponPlan[];
  selectedPlan: WeaponPlan | null;
  onSelectPlan: (plan: WeaponPlan) => void;
  onClosePlan: (planId: string) => void;
  onCloseAllPlans: () => void;
  onOpenLibrary: () => void;
  onDisassociate: (fromPlanId: string, refId: string) => void;
};

export default function OpenPlansPanel({
  plans,
  selectedPlan,
  onSelectPlan,
  onClosePlan,
  onCloseAllPlans,
  onOpenLibrary,
  onDisassociate,
}: OpenPlansPanelProps) {
  const openPlans = plans.filter((plan) => plan.isOpen);
  const isEmpty = openPlans.length === 0;
  const planById = new Map(plans.map((p) => [p.id, p]));

  // Which card is expanded in the panel. Tracked independently of the
  // workspace-selected plan so drilling into an associated plan row keeps the
  // parent card open while the association becomes the selected plan.
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(
    selectedPlan?.id ?? null
  );

  const handleSelectCard = (plan: WeaponPlan) => {
    setExpandedPlanId(plan.id);
    onSelectPlan(plan);
  };

  return (
    <>
      <ClassificationBanner
        accent={appAccent}
        label="Open Plans"
        status={isEmpty ? "Standby" : `${openPlans.length} Open`}
        statusActive={!isEmpty}
        rightSlot={
          !isEmpty ? (
            <Button
              size="small"
              startIcon={<CloseIcon sx={{ fontSize: 13 }} />}
              onClick={onCloseAllPlans}
              sx={closeAllButtonSx}
            >
              Close All
            </Button>
          ) : undefined
        }
      />

      {isEmpty ? (
        <EmptyState onOpenLibrary={onOpenLibrary} />
      ) : (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            p: 2,
            ...scrollbarTacticalSx,
          }}
        >
          <Stack spacing={2}>
            {openPlans.map((plan) => {
              const associatedPlans = plan.associatedPlanIds
                .map((id) => planById.get(id))
                .filter((p): p is WeaponPlan => Boolean(p));

              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={expandedPlanId === plan.id}
                  selectedPlanId={selectedPlan?.id ?? null}
                  associatedPlans={associatedPlans}
                  onSelect={() => handleSelectCard(plan)}
                  onClose={() => onClosePlan(plan.id)}
                  onSelectAssociation={onSelectPlan}
                  onDisassociate={onDisassociate}
                />
              );
            })}
          </Stack>
        </Box>
      )}
    </>
  );
}
