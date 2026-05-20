import { Box, Stack, TextField, Typography } from "@mui/material";

import { monoFont, tacticalSurface } from "../../../theme";
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
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="stretch"
      sx={{
        bgcolor: "#1a1a1a",
        border: `1px solid ${tacticalSurface.border}`,
        borderRadius: 0.5,
        p: 1.75,
      }}
    >
      <Box
        sx={{
          width: 3,
          alignSelf: "stretch",
          bgcolor: accent,
          flexShrink: 0,
        }}
      />
      <Stack spacing={0.85} sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 10,
            letterSpacing: 1.6,
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          PLAN DESIGNATION
        </Typography>
        <TextField
          value={value}
          onChange={(event) => onChange(event.target.value)}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              fontFamily: monoFont,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 0.6,
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
        <PlanDesignationToolbar
          accent={accent}
          warningCount={warningCount}
        />
      </Stack>
    </Stack>
  );
}
