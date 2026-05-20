import { Stack, TextField, Typography } from "@mui/material";

import { monoFont, tacticalSurface } from "../../../theme";

type TacticalTextFieldProps = {
  label: string;
  value: string;
  accent: string;
  multiline?: boolean;
  rows?: number;
  onChange: (next: string) => void;
};

export default function TacticalTextField({
  label,
  value,
  accent,
  multiline,
  rows,
  onChange,
}: TacticalTextFieldProps) {
  return (
    <Stack spacing={0.75}>
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 10,
          letterSpacing: 1.3,
          fontWeight: 700,
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        size="small"
        multiline={multiline}
        minRows={rows}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            fontFamily: monoFont,
            fontSize: 12.5,
            letterSpacing: 0.4,
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
            py: multiline ? 0 : 1,
            px: 1.25,
          },
        }}
      />
    </Stack>
  );
}
