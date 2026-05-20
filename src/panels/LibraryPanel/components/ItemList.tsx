import { Box, Stack, Typography } from "@mui/material";

import { monoFont, scrollbarTacticalSx, tacticalSurface } from "../../../theme";
import { formatMilitaryShort } from "../../../utils/formatting";
import type { WeaponPlan } from "../../../types";
import { cardOuterSx } from "../styles";
import type { PlanFilter } from "../types";

type ItemListProps = {
  plans: WeaponPlan[];
  filter: PlanFilter;
  pendingPlanIds: string[];
  accent: string;
  onToggle: (id: string) => void;
};

export default function ItemList({
  plans,
  filter,
  pendingPlanIds,
  accent,
  onToggle,
}: ItemListProps) {
  if (plans.length === 0) {
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
            NO {filter === "open" ? "OPEN " : filter === "closed" ? "CLOSED " : ""}
            PLANS
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              mt: 0.5,
              lineHeight: 1.5,
            }}
          >
            {filter === "all"
              ? "Nothing matches this view yet."
              : "Try changing the filter to see more."}
          </Typography>
        </Box>
      </Box>
    );
  }

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
      {plans.map((plan) => {
        const selected = pendingPlanIds.includes(plan.id);
        return (
          <Box
            key={plan.id}
            onClick={() => onToggle(plan.id)}
            sx={{
              ...cardOuterSx,
              borderColor: selected ? accent : tacticalSurface.border,
              bgcolor: selected
                ? tacticalSurface.cardSelected
                : tacticalSurface.card,
              boxShadow: selected
                ? `0 0 0 1px ${accent}55, 0 6px 18px rgba(0,0,0,0.35)`
                : "none",
              "&:hover": {
                bgcolor: selected
                  ? tacticalSurface.cardSelected
                  : tacticalSurface.cardHover,
                borderColor: selected ? accent : tacticalSurface.borderHover,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1,
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
                  fontSize: 11.5,
                  letterSpacing: 1.2,
                  fontWeight: 700,
                  color: "text.primary",
                  minWidth: 0,
                  flex: 1,
                }}
                noWrap
              >
                {plan.name.toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 10,
                  letterSpacing: 1.3,
                  fontWeight: 700,
                  color: plan.isOpen ? "#a5d6a7" : "text.secondary",
                  px: 0.75,
                  py: 0.2,
                  border: `1px solid ${
                    plan.isOpen ? "#a5d6a755" : "rgba(255,255,255,0.1)"
                  }`,
                  borderRadius: 0.5,
                  bgcolor: plan.isOpen
                    ? "rgba(165,214,167,0.08)"
                    : "transparent",
                  flexShrink: 0,
                }}
              >
                {plan.isOpen ? "OPEN" : "CLOSED"}
              </Typography>
            </Box>

            <Box sx={{ p: 1.75 }}>
              <Stack spacing={1}>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 10.5,
                    letterSpacing: 1.2,
                    fontWeight: 700,
                    color: "text.secondary",
                  }}
                >
                  DRAFTED BY {plan.createdBy.toUpperCase()} ·{" "}
                  {formatMilitaryShort(plan.modificationDate)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "text.secondary",
                    lineHeight: 1.5,
                  }}
                >
                  {plan.description}
                </Typography>
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
