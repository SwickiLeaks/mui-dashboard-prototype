import { Box, Stack, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { categoryColor } from "../../../categoryColors";
import { monoFont, scrollbarTacticalSx, tacticalSurface } from "../../../theme";
import type { PlanCategory } from "../../../types";
import { categories } from "../data";
import { LIBRARY_ACCENT, cardOuterSx } from "../styles";
import CountChip from "./CountChip";

type CategoryListProps = {
  counts: Record<PlanCategory, number>;
  onSelect: (category: PlanCategory) => void;
};

export default function CategoryList({ counts, onSelect }: CategoryListProps) {
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
        const sprinkle = categoryColor[category.key];
        return (
          <Box
            key={category.key}
            onClick={empty ? undefined : () => onSelect(category.key)}
            sx={{
              ...cardOuterSx,
              p: 1.75,
              cursor: empty ? "default" : "pointer",
              opacity: empty ? 0.55 : 1,
              boxShadow: empty ? "none" : cardOuterSx.boxShadow,
              "&:hover": !empty
                ? {
                    bgcolor: tacticalSurface.cardHover,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.36)",
                  }
                : undefined,
              "&:hover .category-chevron": !empty
                ? { transform: "translateX(3px)", color: LIBRARY_ACCENT }
                : undefined,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: empty
                    ? "rgba(255,255,255,0.05)"
                    : `${sprinkle}24`,
                  color: empty ? "text.secondary" : sprinkle,
                  flexShrink: 0,
                }}
              >
                {category.icon}
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    color: "text.primary",
                  }}
                >
                  {category.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: "text.secondary",
                    lineHeight: 1.4,
                    mt: 0.25,
                  }}
                >
                  {category.description}
                </Typography>
              </Box>

              {empty ? (
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 11.5,
                    letterSpacing: 0.2,
                    fontWeight: 700,
                    color: "text.secondary",
                    px: 0.85,
                    py: 0.3,
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 0.5,
                    flexShrink: 0,
                  }}
                >
                  Empty
                </Typography>
              ) : (
                <CountChip count={count} accent={LIBRARY_ACCENT} />
              )}

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
        );
      })}
    </Stack>
  );
}
