import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { monoFont } from "../../../theme";
import TacticalNumberField from "./TacticalNumberField";

type DefaultReleaseSettingsProps = {
  accent: string;
};

/**
 * Compact row of defaults (altitude / airspeed / flight-path angle) that
 * future "new release" actions will seed with. UI-only state for now —
 * nothing is persisted to the plan.
 */
export default function DefaultReleaseSettings({
  accent,
}: DefaultReleaseSettingsProps) {
  const [altitude, setAltitude] = useState<number | undefined>();
  const [airspeed, setAirspeed] = useState<number | undefined>();
  const [fpa, setFpa] = useState<number | undefined>();

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 10,
          letterSpacing: 1.5,
          fontWeight: 700,
          color: "text.secondary",
          mb: 1,
        }}
      >
        DEFAULT RELEASE SETTINGS
      </Typography>
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
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TacticalNumberField
            label="FPA"
            value={fpa}
            accent={accent}
            onChange={setFpa}
          />
        </Box>
      </Stack>
    </Box>
  );
}
