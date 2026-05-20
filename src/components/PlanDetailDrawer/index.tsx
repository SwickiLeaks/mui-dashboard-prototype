import { useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";

import {
  ClassificationBanner,
  TacticalSection,
  scrollbarTacticalSx,
  tacticalSurface,
} from "../../theme";
import type { Release, Target, WeaponPlan } from "../../types";

import DefaultReleaseSettings from "./components/DefaultReleaseSettings";
import PlanNameSection from "./components/PlanNameSection";
import PlanOverviewTree from "./components/PlanOverviewTree";
import SelectedItemSection from "./components/SelectedItemSection";
import { categoryColor } from "./styles";
import type { Selection } from "./types";
import { hasCoordinates } from "./utils";

type PlanDetailDrawerProps = {
  plan: WeaponPlan;
  plans: WeaponPlan[];
  onClose: () => void;
  onUpdatePlan: (plan: WeaponPlan) => void;
};

export default function PlanDetailDrawer({
  plan,
  onClose,
  onUpdatePlan,
}: PlanDetailDrawerProps) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(
    () => new Set(plan.releases.map((r) => r.id))
  );

  useEffect(() => {
    setSelection(null);
    setExpandedReleases(new Set(plan.releases.map((r) => r.id)));
    // intentionally key only on the plan id so edits don't collapse the tree
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan.id]);

  const accent = categoryColor[plan.category];

  const targetById = useMemo(
    () => new Map(plan.targets.map((t) => [t.id, t])),
    [plan.targets]
  );

  const warningCount = useMemo(() => {
    let count = 0;
    plan.releases.forEach((release) => {
      if (!hasCoordinates(release)) count += 1;
      release.targetIds.forEach((id) => {
        const target = targetById.get(id);
        if (target && !hasCoordinates(target)) count += 1;
      });
    });
    return count;
  }, [plan.releases, targetById]);

  const toggleExpanded = (releaseId: string) => {
    setExpandedReleases((current) => {
      const next = new Set(current);
      if (next.has(releaseId)) {
        next.delete(releaseId);
      } else {
        next.add(releaseId);
      }
      return next;
    });
  };

  const handleNameChange = (newName: string) => {
    onUpdatePlan({ ...plan, name: newName });
  };

  const updateRelease = (releaseId: string, updates: Partial<Release>) => {
    onUpdatePlan({
      ...plan,
      releases: plan.releases.map((r) =>
        r.id === releaseId ? { ...r, ...updates } : r
      ),
    });
  };

  const updateTarget = (targetId: string, updates: Partial<Target>) => {
    onUpdatePlan({
      ...plan,
      targets: plan.targets.map((t) =>
        t.id === targetId ? { ...t, ...updates } : t
      ),
    });
  };

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
        accent={accent}
        label="WEAPON PLAN EDITOR"
        status={plan.isOpen ? "ACTIVE" : "INACTIVE"}
        statusActive={plan.isOpen}
        onClose={onClose}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 2.25,
          ...scrollbarTacticalSx,
        }}
      >
        <Stack spacing={2}>
          <PlanNameSection
            value={plan.name}
            accent={accent}
            warningCount={warningCount}
            onChange={handleNameChange}
          />

          <TacticalSection label="PLAN OVERVIEW" accent={accent}>
            <Stack
              spacing={1.5}
              divider={
                <Box
                  sx={{
                    borderTop: "1px dashed rgba(255,255,255,0.1)",
                  }}
                />
              }
            >
              <DefaultReleaseSettings accent={accent} />
              <PlanOverviewTree
                releases={plan.releases}
                targetById={targetById}
                expanded={expandedReleases}
                selection={selection}
                accent={accent}
                onToggle={toggleExpanded}
                onSelect={setSelection}
              />
            </Stack>
          </TacticalSection>

          <SelectedItemSection
            plan={plan}
            selection={selection}
            accent={accent}
            onUpdateRelease={updateRelease}
            onUpdateTarget={updateTarget}
          />
        </Stack>
      </Box>
    </Box>
  );
}
