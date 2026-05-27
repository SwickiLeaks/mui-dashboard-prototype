import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { monoFont, tacticalSurface } from "./tokens";

type ClassificationBannerProps = {
  accent: string;
  label: string;
  status?: string;
  statusActive?: boolean;
  onClose?: () => void;
  rightSlot?: React.ReactNode;
};

export function ClassificationBanner({
  accent,
  label,
  status,
  statusActive,
  onClose,
  rightSlot,
}: ClassificationBannerProps) {
  return (
    <Box
      sx={{
        position: "relative",
        px: 2.25,
        py: 1.5,
        bgcolor: tacticalSurface.banner,
        borderBottom: `1px solid ${tacticalSurface.borderHover}`,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", minHeight: 30 }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: 11,
              letterSpacing: 1.8,
              fontWeight: 700,
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Typography>
          {status && (
            <>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                //
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 11,
                  letterSpacing: 1.8,
                  fontWeight: 700,
                  color: statusActive ? "#90caf9" : "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                {status}
              </Typography>
            </>
          )}
        </Stack>
        {rightSlot ??
          (onClose && (
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                width: 26,
                height: 26,
                borderRadius: 0.5,
                color: "text.secondary",
                border: "1px solid rgba(255,255,255,0.08)",
                "&:hover": {
                  color: "text.primary",
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
          ))}
      </Stack>
    </Box>
  );
}

type TacticalSectionProps = {
  label: string;
  icon?: React.ComponentType<{ sx?: object }>;
  accent: string;
  children: React.ReactNode;
  bodyPadding?: number | string;
};

export function TacticalSection({
  label,
  icon: Icon,
  accent,
  children,
  bodyPadding = 1.75,
}: TacticalSectionProps) {
  return (
    <Box
      sx={{
        bgcolor: tacticalSurface.card,
        border: `1px solid ${tacticalSurface.border}`,
        borderRadius: 0.5,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.95,
          bgcolor: tacticalSurface.cardHeader,
          borderBottom: `1px solid ${tacticalSurface.hairline}`,
        }}
      >
        <Box sx={{ width: 3, height: 14, bgcolor: accent, flexShrink: 0 }} />
        {Icon && <Icon sx={{ fontSize: 13, color: "text.secondary" }} />}
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 12.5,
            letterSpacing: 0.2,
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box sx={{ p: bodyPadding }}>{children}</Box>
    </Box>
  );
}

type DataRowProps = {
  label: string;
  value: string;
};

export function DataRow({ label, value }: DataRowProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="baseline"
      spacing={1.5}
    >
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 11,
          letterSpacing: 1.2,
          fontWeight: 700,
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 12,
          fontWeight: 600,
          color: "text.primary",
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

type StatPillProps = {
  icon?: React.ReactNode;
  label: string;
  count: number;
};

/**
 * Tactical stat readout — icon + count + uppercase label. The icon and the
 * count-label group are centered to each other in the row, and the count
 * and label share a text baseline inside that group, so all three read as
 * one tight horizontal unit. Empty (count===0) dims to a "no data" state.
 */
export function StatPill({ icon, label, count }: StatPillProps) {
  const populated = count > 0;
  const valueColor = populated ? "text.primary" : "rgba(255,255,255,0.32)";
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 0.95,
        py: 0.5,
        borderRadius: 0.5,
        bgcolor: populated
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${
          populated ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"
        }`,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            color: valueColor,
            "& > svg": { display: "block" },
          }}
        >
          {icon}
        </Box>
      )}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: 0.6,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: monoFont,
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1,
            color: valueColor,
          }}
        >
          {count}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: monoFont,
            fontSize: 10,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 1.3,
            color: "text.secondary",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}
