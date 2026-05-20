import { Box, Stack, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { monoFont, scrollbarTacticalSx, tacticalSurface } from "../../../theme";
import type { PlanCategory } from "../../../types";
import { categories } from "../data";
import { cardOuterSx } from "../styles";
import CountChip from "./CountChip";

type CategoryListProps = {
  counts: Record<PlanCategory, number>;
  accent: string;
  onSelect: (category: PlanCategory) => void;
};

export default function CategoryList({
  counts,
  accent,
  onSelect,
}: CategoryListProps) {
  return (
    <Stack
      spacing={1}
      sx={{
        ...scrollbarTacticalSx,
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        p: 2,
      }}
    >
      {categories.map((category) => {
        const count = counts[category.key];
        const empty = count === 0;
        return (
          <Box
            key={category.key}
            onClick={empty ? undefined : () => onSelect(category.key)}
            sx={{
              ...cardOuterSx,
              cursor: empty ? "default" : "pointer",
              opacity: empty ? 0.55 : 1,
              "&:hover": !empty
                ? {
                    borderColor: accent,
                    bgcolor: tacticalSurface.cardHover,
                    boxShadow: `0 0 0 1px ${accent}33`,
                  }
                : undefined,
              "&:hover .category-chevron": !empty
                ? { transform: "translateX(3px)", color: accent }
                : undefined,
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
              <Box
                sx={{ width: 3, height: 14, bgcolor: accent, flexShrink: 0 }}
              />
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 10.5,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  color: "text.secondary",
                  flex: 1,
                }}
              >
                {category.label.toUpperCase()}
              </Typography>
              {empty ? (
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 10.5,
                    letterSpacing: 1.2,
                    fontWeight: 700,
                    color: "text.secondary",
                    px: 0.85,
                    py: 0.25,
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 0.5,
                  }}
                >
                  EMPTY
                </Typography>
              ) : (
                <CountChip count={count} accent={accent} />
              )}
            </Box>

            <Box sx={{ p: 1.75 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 0.5,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "rgba(255,255,255,0.04)",
                    color: empty ? "text.secondary" : accent,
                    border: "1px solid rgba(255,255,255,0.1)",
                    flexShrink: 0,
                  }}
                >
                  {category.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "text.secondary",
                    minWidth: 0,
                    flex: 1,
                    lineHeight: 1.45,
                  }}
                >
                  {category.description}
                </Typography>
                <ChevronRightIcon
                  className="category-chevron"
                  sx={{
                    fontSize: 19,
                    color: empty
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.3)",
                    transition: "transform 140ms ease, color 140ms ease",
                    flexShrink: 0,
                  }}
                />
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
