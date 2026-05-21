import { useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";

import { monoFont, tacticalSurface } from "../../../theme";

type TacticalNumberFieldProps = {
  label: string;
  value: number | undefined;
  accent: string;
  onChange: (next: number | undefined) => void;
};

export default function TacticalNumberField({
  label,
  value,
  accent,
  onChange,
}: TacticalNumberFieldProps) {
  const [draft, setDraft] = useState<string>(
    value !== undefined ? String(value) : ""
  );

  useEffect(() => {
    setDraft(value !== undefined ? String(value) : "");
  }, [value]);

  const commit = (raw: string) => {
    setDraft(raw);
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed === "-" || trimmed === ".") {
      onChange(undefined);
      return;
    }
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) {
      onChange(parsed);
    }
  };

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
        value={draft}
        onChange={(event) => commit(event.target.value)}
        placeholder="—"
        fullWidth
        size="small"
        variant="outlined"
        inputMode="decimal"
        sx={{
          "& .MuiOutlinedInput-root": {
            fontFamily: monoFont,
            fontSize: 13,
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
            py: 1,
            px: 1.25,
          },
        }}
      />
    </Stack>
  );
}
