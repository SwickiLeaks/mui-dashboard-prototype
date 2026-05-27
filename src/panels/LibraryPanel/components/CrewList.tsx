import { Box, Stack, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { monoFont, scrollbarTacticalSx, tacticalSurface } from "../../../theme";
import { LIBRARY_ACCENT, cardOuterSx } from "../styles";
import { initials } from "../utils";
import CountChip from "./CountChip";

type CrewListProps = {
  crewMembers: Array<{ name: string; count: number }>;
  onSelect: (crew: string) => void;
};

export default function CrewList({ crewMembers, onSelect }: CrewListProps) {
  if (crewMembers.length === 0) {
    return (
      <Box sx={{ p: 1.5 }}>
        <Box
          sx={{
            p: 1.5,
            bgcolor: tacticalSurface.card,
            border: `1px solid ${tacticalSurface.border}`,
            borderRadius: 0.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: 13,
              letterSpacing: 0.2,
              color: "text.secondary",
            }}
          >
            No crew folders
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Stack
      spacing={1.25}
      sx={{
        ...scrollbarTacticalSx,
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        p: 2,
      }}
    >
      {crewMembers.map(({ name, count }) => (
        <Box
          key={name}
          onClick={() => onSelect(name)}
          sx={{
            ...cardOuterSx,
            "&:hover": {
              bgcolor: tacticalSurface.cardHover,
              boxShadow: "0 6px 16px rgba(0,0,0,0.36)",
            },
            "&:hover .crew-chevron": {
              transform: "translateX(3px)",
              color: LIBRARY_ACCENT,
            },
          }}
        >
          <Box sx={{ p: 1.75 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  bgcolor: `${LIBRARY_ACCENT}24`,
                  color: LIBRARY_ACCENT,
                  fontFamily: monoFont,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                {initials(name)}
              </Box>

              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                  color: "text.primary",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {name}
              </Typography>

              <CountChip count={count} accent={LIBRARY_ACCENT} />
              <ChevronRightIcon
                className="crew-chevron"
                sx={{
                  fontSize: 19,
                  color: "rgba(255,255,255,0.3)",
                  transition: "transform 140ms ease, color 140ms ease",
                  flexShrink: 0,
                }}
              />
            </Stack>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
