import { Typography } from "@mui/material";

import { TacticalSection, monoFont } from "../../../theme";
import type { Release, Target, WeaponPlan } from "../../../types";
import type { Selection } from "../types";
import ReleaseDetailsForm from "./ReleaseDetailsForm";
import TargetDetailsForm from "./TargetDetailsForm";

type SelectedItemSectionProps = {
  plan: WeaponPlan;
  selection: Selection | null;
  accent: string;
  onUpdateRelease: (releaseId: string, updates: Partial<Release>) => void;
  onUpdateTarget: (targetId: string, updates: Partial<Target>) => void;
};

export default function SelectedItemSection({
  plan,
  selection,
  accent,
  onUpdateRelease,
  onUpdateTarget,
}: SelectedItemSectionProps) {
  if (!selection) {
    return (
      <TacticalSection label="DETAILS" accent={accent}>
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 11,
            letterSpacing: 1.2,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          SELECT A RELEASE OR TARGET ABOVE TO INSPECT.
        </Typography>
      </TacticalSection>
    );
  }

  if (selection.kind === "release") {
    const release = plan.releases.find((r) => r.id === selection.releaseId);
    if (!release) return null;
    return (
      <TacticalSection label="RELEASE DETAILS" accent={accent}>
        <ReleaseDetailsForm
          key={release.id}
          release={release}
          accent={accent}
          onUpdateRelease={onUpdateRelease}
        />
      </TacticalSection>
    );
  }

  const target = plan.targets.find((t) => t.id === selection.targetId);
  if (!target) return null;
  return (
    <TacticalSection label="TARGET DETAILS" accent={accent}>
      <TargetDetailsForm
        key={target.id}
        target={target}
        accent={accent}
        onUpdateTarget={onUpdateTarget}
      />
    </TacticalSection>
  );
}
