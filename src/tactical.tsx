import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const monoFont =
  '"Chakra Petch", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

export const tacticalSurface = {
  panel: "#181818",
  card: "#222222",
  cardHover: "#272727",
  cardSelected: "#2a2a2a",
  cardHeader: "#1a1a1a",
  banner: "#0f0f0f",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.18)",
  borderStrong: "rgba(255,255,255,0.28)",
  hairline: "rgba(255,255,255,0.06)",
};

export const monoLabelSx = {
  fontFamily: monoFont,
  fontSize: 10.5,
  letterSpacing: 1.5,
  fontWeight: 700,
  color: "text.secondary",
} as const;

export const monoValueSx = {
  fontFamily: monoFont,
  fontSize: 12,
  fontWeight: 600,
  color: "text.primary",
} as const;

export const formatMilitary = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${day} ${month} ${date.getFullYear()}`;
};

export const formatMilitaryShort = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${day} ${month}`;
};

export const scrollbarTacticalSx = {
  scrollbarWidth: "thin",
  scrollbarColor: "#555 #1a1a1a",
  "&::-webkit-scrollbar": { width: 6 },
  "&::-webkit-scrollbar-track": { backgroundColor: "#1a1a1a" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#555",
    borderRadius: 0,
  },
} as const;

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
        px: 1.75,
        py: 1.25,
        bgcolor: tacticalSurface.banner,
        borderBottom: `2px solid ${accent}`,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          background: `repeating-linear-gradient(135deg, ${accent} 0 1px, transparent 1px 7px)`,
          pointerEvents: "none",
        }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", minHeight: 26 }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: accent,
              boxShadow: `0 0 10px ${accent}cc`,
              flexShrink: 0,
            }}
          />
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
                sx={{ fontFamily: monoFont, fontSize: 11, color: "rgba(255,255,255,0.25)" }}
              >
                //
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 11,
                  letterSpacing: 1.8,
                  fontWeight: 700,
                  color: statusActive ? "#a5d6a7" : "text.secondary",
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
  bodyPadding = 1.25,
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
          gap: 0.85,
          px: 1.25,
          py: 0.6,
          bgcolor: tacticalSurface.cardHeader,
          borderBottom: `1px solid ${tacticalSurface.hairline}`,
        }}
      >
        <Box sx={{ width: 3, height: 12, bgcolor: accent, flexShrink: 0 }} />
        {Icon && <Icon sx={{ fontSize: 13, color: "text.secondary" }} />}
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 10.5,
            letterSpacing: 1.5,
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
