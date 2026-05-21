import { Stack, TextField } from "@mui/material";

import { TacticalSection, tacticalSurface } from "../../../theme";
import PlanDesignationToolbar from "./PlanDesignationToolbar";

type PlanNameSectionProps = {
  value: string;
  accent: string;
  warningCount: number;
  onChange: (next: string) => void;
};

export default function PlanNameSection({
  value,
  accent,
  warningCount,
  onChange,
}: PlanNameSectionProps) {
  return (
    <TacticalSection label="PLAN DESIGNATION" accent={accent}>
      <Stack spacing={1.25}>
        <TextField
          value={value}
          onChange={(event) => onChange(event.target.value)}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: 14,
              fontWeight: 600,
              bgcolor: "#141414",
              borderRadius: 0.5,
              "& fieldset": { borderColor: tacticalSurface.border },
              "&:hover fieldset": { borderColor: tacticalSurface.borderHover },
              "&.Mui-focused fieldset": {
                borderColor: accent,
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-input": {
              py: 1,
              px: 1.25,
            },
          }}
        />
        <PlanDesignationToolbar accent={accent} warningCount={warningCount} />
      </Stack>
    </TacticalSection>
  );
}
