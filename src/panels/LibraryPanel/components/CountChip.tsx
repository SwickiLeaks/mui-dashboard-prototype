import { Box } from "@mui/material";

import { monoFont } from "../../../theme";

type CountChipProps = {
  count: number;
  accent: string;
};

export default function CountChip({ count, accent }: CountChipProps) {
  const populated = count > 0;
  return (
    <Box
      sx={{
        minWidth: 30,
        height: 22,
        px: 0.85,
        borderRadius: 0.5,
        display: "grid",
        placeItems: "center",
        bgcolor: populated ? `${accent}1c` : "rgba(255,255,255,0.04)",
        border: `1px solid ${
          populated ? `${accent}55` : "rgba(255,255,255,0.08)"
        }`,
        color: populated ? accent : "text.secondary",
        fontFamily: monoFont,
        fontSize: 11.5,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: 0.8,
        flexShrink: 0,
      }}
    >
      {count}
    </Box>
  );
}
