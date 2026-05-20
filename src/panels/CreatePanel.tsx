import { Box, Stack, TextField } from "@mui/material";

import PanelHeader from "../components/PanelHeader";
import PanelActions from "../components/PanelActions";
import { monoFont, scrollbarTacticalSx, tacticalSurface } from "../tactical";

type CreatePanelProps = {
  onClose: () => void;
};

const ACCENT = "#a5d6a7";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: tacticalSurface.card,
    borderRadius: 0.5,
    fontSize: 14,
    "& fieldset": { borderColor: tacticalSurface.border },
    "&:hover fieldset": { borderColor: tacticalSurface.borderHover },
    "&.Mui-focused fieldset": { borderColor: ACCENT, borderWidth: 1 },
  },
  "& .MuiInputLabel-root": {
    fontFamily: monoFont,
    fontSize: 11.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: "text.secondary",
    "&.Mui-focused": { color: ACCENT },
  },
} as const;

export default function CreatePanel({ onClose }: CreatePanelProps) {
  return (
    <>
      <PanelHeader
        title="Create"
        description="Define the basics for a new plan before configuring its details."
        accent={ACCENT}
        activeStep={0}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 1.5,
          ...scrollbarTacticalSx,
        }}
      >
        <Stack spacing={2}>
          <TextField fullWidth label="Title" sx={fieldSx} />
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Description"
            sx={fieldSx}
          />
        </Stack>
      </Box>

      <PanelActions accent={ACCENT} onClose={onClose} />
    </>
  );
}
