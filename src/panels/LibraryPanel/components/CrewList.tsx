import { Box, Stack, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { monoFont, scrollbarTacticalSx, tacticalSurface } from "../../../theme";
import { cardOuterSx } from "../styles";
import { initials } from "../utils";
import CountChip from "./CountChip";

type CrewListProps = {
  crewMembers: Array<{ name: string; count: number }>;
  accent: string;
  onSelect: (crew: string) => void;
};

export default function CrewList({
  crewMembers,
  accent,
  onSelect,
}: CrewListProps) {
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
              fontSize: 11,
              letterSpacing: 1.4,
              color: "text.secondary",
            }}
          >
            NO CREW FOLDERS
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
              borderColor: accent,
              bgcolor: tacticalSurface.cardHover,
              boxShadow: `0 0 0 1px ${accent}33`,
            },
            "&:hover .crew-chevron": {
              transform: "translateX(3px)",
              color: accent,
            },
          }}
        >
          <Box sx={{ p: 1.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 0.5,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  bgcolor: `${accent}1c`,
                  color: accent,
                  border: `1px solid ${accent}55`,
                  fontFamily: monoFont,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                {initials(name)}
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: "text.primary",
                  }}
                >
                  {name.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 10.5,
                    letterSpacing: 1.2,
                    color: "text.secondary",
                    mt: 0.15,
                  }}
                >
                  {count} {count === 1 ? "PLAN" : "PLANS"}
                </Typography>
              </Box>

              <CountChip count={count} accent={accent} />
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
