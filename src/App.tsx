import { useEffect, useState } from "react";
import { Box, CssBaseline, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { darkTheme } from "./theme";
import { weaponPlans as initialWeaponPlans } from "./data/weaponPlans";
import type { PanelKey, WeaponPlan } from "./types";

import AppHeader from "./components/AppHeader";
import DashboardContent from "./components/DashboardContent";
import PlanDetailDrawer from "./components/PlanDetailDrawer";
import WizardPanel from "./components/WizardPanel";

export default function App() {
  const [plans, setPlans] = useState<WeaponPlan[]>(initialWeaponPlans);
  const [expandedControls, setExpandedControls] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState<PanelKey | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<WeaponPlan | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === "Escape") {
        setSelectedPanel(null);
        return;
      }

      const hotkeys: Record<string, PanelKey> = {
        F1: "map",
        F2: "create",
        F3: "library",
        F4: "tools",
        F5: "review",
      };

      const panel = hotkeys[event.key];
      if (!panel) return;

      event.preventDefault();
      setExpandedControls(true);
      setSelectedPanel((current) => (current === panel ? null : panel));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closePanel = () => {
    setSelectedPanel(null);
  };

  const handlePlanSelect = (plan: WeaponPlan) => {
    setSelectedPlan(plan);
    setDrawerOpen(true);
  };

  const handleClosePlan = (planId: string) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === planId ? { ...plan, isOpen: false } : plan
      )
    );

    setSelectedPlan((currentSelectedPlan) =>
      currentSelectedPlan?.id === planId ? null : currentSelectedPlan
    );
  };

  const handleCloseAllPlans = () => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) => (plan.isOpen ? { ...plan, isOpen: false } : plan))
    );
    setSelectedPlan(null);
  };

  const handleOpenPlans = (planIds: string[]) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        planIds.includes(plan.id) ? { ...plan, isOpen: true } : plan
      )
    );

    setExpandedControls(true);
    setSelectedPanel("map");
  };

  const handleOpenLibrary = () => {
    setExpandedControls(true);
    setSelectedPanel("library");
  };

  const handleUpdatePlan = (updatedPlan: WeaponPlan) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === updatedPlan.id ? updatedPlan : plan
      )
    );
    setSelectedPlan((current) =>
      current?.id === updatedPlan.id ? updatedPlan : current
    );
  };

  const handleOpenAssociation = (planId: string) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === planId ? { ...plan, isOpen: true } : plan
      )
    );

    const target = plans.find((plan) => plan.id === planId);
    if (target) {
      setSelectedPlan({ ...target, isOpen: true });
    }
  };

  const handleDisassociate = (fromPlanId: string, refId: string) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) => {
        if (plan.id !== fromPlanId) return plan;
        return {
          ...plan,
          associatedPlanIds: plan.associatedPlanIds.filter((id) => id !== refId),
        };
      })
    );

    setSelectedPlan((current) => {
      if (!current || current.id !== fromPlanId) return current;
      return {
        ...current,
        associatedPlanIds: current.associatedPlanIds.filter((id) => id !== refId),
      };
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <AppHeader
          expandedControls={expandedControls}
          selectedPanel={selectedPanel}
          selectedPlan={selectedPlan}
          onExpandedControlsChange={setExpandedControls}
          onSelectedPanelChange={setSelectedPanel}
        />

        <Box sx={{ position: "relative" }}>
          <Paper
            elevation={0}
            square
            sx={{
              height: "calc(100vh - 64px)",
              overflow: "hidden",
              border: "1px dashed",
              borderColor: "grey.800",
              bgcolor: "#0f0f0f",
            }}
          >
            <DashboardContent selectedPlan={selectedPlan} />
          </Paper>

          {selectedPanel && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                display: "flex",
                alignItems: "stretch",
                justifyContent: "flex-start",
                pointerEvents: "none",
                p: 3,
              }}
            >
              <Box
                sx={{
                  width: "min(520px, calc(100vw - 48px))",
                  pointerEvents: "auto",
                  animation: "panelSlideIn 220ms ease-out",
                  "@keyframes panelSlideIn": {
                    from: {
                      opacity: 0,
                      transform: "translateX(-18px) scale(0.98)",
                    },
                    to: {
                      opacity: 1,
                      transform: "translateX(0) scale(1)",
                    },
                  },
                }}
              >
                <WizardPanel
                  selectedPanel={selectedPanel}
                  selectedPlan={selectedPlan}
                  plans={plans}
                  onSelectPlan={handlePlanSelect}
                  onClosePlan={handleClosePlan}
                  onCloseAllPlans={handleCloseAllPlans}
                  onOpenPlans={handleOpenPlans}
                  onOpenLibrary={handleOpenLibrary}
                  onOpenAssociation={handleOpenAssociation}
                  onDisassociate={handleDisassociate}
                  onClose={closePanel}
                />
              </Box>
            </Box>
          )}

          {selectedPlan && drawerOpen && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: 520,
                zIndex: 10,
                animation: "drawerSlideIn 220ms ease-out",
                "@keyframes drawerSlideIn": {
                  from: {
                    opacity: 0,
                    transform: "translateX(18px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
              }}
            >
              <PlanDetailDrawer
                plan={selectedPlan}
                plans={plans}
                onClose={() => setDrawerOpen(false)}
                onUpdatePlan={handleUpdatePlan}
              />
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
