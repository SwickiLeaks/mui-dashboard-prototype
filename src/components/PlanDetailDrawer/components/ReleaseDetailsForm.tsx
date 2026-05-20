import { useState } from "react";
import { Box, Stack } from "@mui/material";

import type { Release } from "../../../types";
import TacticalNumberField from "./TacticalNumberField";
import TacticalTextField from "./TacticalTextField";

type ReleaseDetailsFormProps = {
  release: Release;
  accent: string;
  onUpdateRelease: (releaseId: string, updates: Partial<Release>) => void;
};

/**
 * Form for the currently-selected release. Mount this with `key={release.id}`
 * so local-only fields reset when the selection changes.
 *
 * `name` / `latitude` / `longitude` persist to the plan via onUpdateRelease.
 * `altitude` / `heading` / `airspeed` / `headingTolerance` are UI-only — they
 * will be promoted to the data model once the calculator wiring lands.
 */
export default function ReleaseDetailsForm({
  release,
  accent,
  onUpdateRelease,
}: ReleaseDetailsFormProps) {
  const [altitude, setAltitude] = useState<number | undefined>();
  const [heading, setHeading] = useState<number | undefined>();
  const [airspeed, setAirspeed] = useState<number | undefined>();
  const [headingTolerance, setHeadingTolerance] = useState<number | undefined>();

  return (
    <Stack spacing={1.5}>
      <TacticalTextField
        label="NAME"
        value={release.name}
        accent={accent}
        onChange={(v) => onUpdateRelease(release.id, { name: v })}
      />
      <Stack direction="row" spacing={1.25}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="LATITUDE"
            value={release.latitude}
            accent={accent}
            onChange={(v) => onUpdateRelease(release.id, { latitude: v })}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="LONGITUDE"
            value={release.longitude}
            accent={accent}
            onChange={(v) => onUpdateRelease(release.id, { longitude: v })}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="ALTITUDE"
            value={altitude}
            accent={accent}
            onChange={setAltitude}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="AIRSPEED"
            value={airspeed}
            accent={accent}
            onChange={setAirspeed}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={1.25}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="RELEASE HEADING"
            value={heading}
            accent={accent}
            onChange={setHeading}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="HEADING TOL"
            value={headingTolerance}
            accent={accent}
            onChange={setHeadingTolerance}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
