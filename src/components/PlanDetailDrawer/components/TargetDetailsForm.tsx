import { useState } from "react";
import { Box, Stack } from "@mui/material";

import type { Target } from "../../../types";
import TacticalNumberField from "./TacticalNumberField";
import TacticalTextField from "./TacticalTextField";

type TargetDetailsFormProps = {
  target: Target;
  accent: string;
  onUpdateTarget: (targetId: string, updates: Partial<Target>) => void;
};

/**
 * Form for the currently-selected target. Mount with `key={target.id}` so
 * local-only fields reset when the selection changes.
 *
 * `name` / `latitude` / `longitude` persist via onUpdateTarget; `elevation`
 * is UI-only for now.
 */
export default function TargetDetailsForm({
  target,
  accent,
  onUpdateTarget,
}: TargetDetailsFormProps) {
  const [elevation, setElevation] = useState<number | undefined>();

  return (
    <Stack spacing={1.5}>
      <TacticalTextField
        label="NAME"
        value={target.name}
        accent={accent}
        onChange={(v) => onUpdateTarget(target.id, { name: v })}
      />
      <Stack direction="row" spacing={1.25}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="LATITUDE"
            value={target.latitude}
            accent={accent}
            onChange={(v) => onUpdateTarget(target.id, { latitude: v })}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="LONGITUDE"
            value={target.longitude}
            accent={accent}
            onChange={(v) => onUpdateTarget(target.id, { longitude: v })}
          />
        </Box>
      </Stack>
      <TacticalNumberField
        label="ELEVATION"
        value={elevation}
        accent={accent}
        onChange={setElevation}
      />
    </Stack>
  );
}
