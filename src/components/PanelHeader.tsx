import { Box, Stack, Typography } from "@mui/material";

import { ClassificationBanner, monoFont, tacticalSurface } from "../theme";

type PanelHeaderProps = {
  title: string;
  description: string;
  accent: string;
  activeStep?: number;
};

const PHASES = ["BASICS", "CONFIGURE", "REVIEW"] as const;

const STATUS_LABELS = ["DRAFT", "IN PROGRESS", "FINAL"] as const;

export default function PanelHeader({
  title,
  description,
  accent,
  activeStep = 1,
}: PanelHeaderProps) {
  const safeStep = Math.max(0, Math.min(activeStep, PHASES.length - 1));
  return (
    <>
      <ClassificationBanner
        accent={accent}
        label={title.toUpperCase()}
        status={STATUS_LABELS[safeStep]}
        statusActive={safeStep === PHASES.length - 1}
      />

      <Box
        sx={{
          px: 1.75,
          py: 1.5,
          bgcolor: "#1a1a1a",
          borderBottom: `1px solid ${tacticalSurface.hairline}`,
        }}
      >
        <Stack direction="row" spacing={0.75} alignItems="center">
          {PHASES.map((phase, idx) => {
            const isActive = idx === safeStep;
            const isPast = idx < safeStep;
            return (
              <Stack
                key={phase}
                direction="row"
                spacing={0.65}
                alignItems="center"
                sx={{ flex: 1, minWidth: 0 }}
              >
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: 0.5,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: monoFont,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    flexShrink: 0,
                    bgcolor: isActive
                      ? `${accent}1c`
                      : isPast
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.02)",
                    border: `1px solid ${
                      isActive
                        ? `${accent}88`
                        : isPast
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255,255,255,0.08)"
                    }`,
                    color: isActive
                      ? accent
                      : isPast
                        ? "text.primary"
                        : "text.secondary",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </Box>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 10.5,
                    letterSpacing: 1.2,
                    fontWeight: 700,
                    color: isActive ? "text.primary" : "text.secondary",
                    opacity: isActive ? 1 : isPast ? 0.85 : 0.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {phase}
                </Typography>
              </Stack>
            );
          })}
        </Stack>

        <Typography
          sx={{
            mt: 1,
            fontSize: 13,
            color: "text.secondary",
            lineHeight: 1.45,
          }}
        >
          {description}
        </Typography>
      </Box>
    </>
  );
}
