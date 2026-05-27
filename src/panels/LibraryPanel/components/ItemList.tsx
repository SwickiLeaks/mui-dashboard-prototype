import { Box, Stack, Typography } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import {
  appAccent,
  monoFont,
  scrollbarTacticalSx,
  tacticalSurface,
} from "../../../theme";
import { formatMilitaryShort } from "../../../utils/formatting";
import type { WeaponPlan } from "../../../types";
import { cardOuterSx } from "../styles";
import type { PlanFilter } from "../types";

type ItemListProps = {
  plans: WeaponPlan[];
  filter: PlanFilter;
  pendingPlanIds: string[];
  onToggle: (id: string) => void;
};

export default function ItemList({
  plans,
  filter,
  pendingPlanIds,
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
              fontSize: 14,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            No {filter === "open" ? "open " : filter === "closed" ? "closed " : ""}
            plans
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
              borderColor: selected ? appAccent : tacticalSurface.border,
              bgcolor: selected
                ? `${appAccent}14`
                : tacticalSurface.card,
              boxShadow: selected
                ? `0 0 0 1px ${appAccent}66`
                : "none",
              "&:hover": {
                bgcolor: selected
                  ? `${appAccent}1f`
                  : tacticalSurface.cardHover,
                borderColor: selected ? appAccent : tacticalSurface.borderHover,
              },
            }}
          >
            <Box sx={{ p: 1.75 }}>
              <Stack spacing={1.25}>
                <Stack direction="row" alignItems="center" gap={1.25}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      color: selected ? appAccent : "rgba(255,255,255,0.35)",
                      flexShrink: 0,
                      transition: "color 140ms ease",
                    }}
                  >
                    {selected ? (
                      <CheckCircleIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <CircleOutlinedIcon sx={{ fontSize: 20 }} />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: 17,
                      letterSpacing: 0,
                      fontWeight: 700,
                      color: "text.primary",
                      minWidth: 0,
                      flex: 1,
                      lineHeight: 1.25,
                    }}
                    noWrap
                  >
                    {plan.name}
                  </Typography>
                  {plan.isOpen && (
                    <Typography
                      sx={{
                        fontFamily: monoFont,
                        fontSize: 11,
                        letterSpacing: 0.1,
                        fontWeight: 600,
                        color: "#90caf9",
                        px: 0.85,
                        py: 0.25,
                        border: "1px solid rgba(144,202,249,0.4)",
                        borderRadius: 0.5,
                        bgcolor: "rgba(144,202,249,0.12)",
                        flexShrink: 0,
                      }}
                    >
                      Open
                    </Typography>
                  )}
                </Stack>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 12,
                    letterSpacing: 0.1,
                    fontWeight: 500,
                    color: "text.secondary",
                  }}
                >
                  Drafted by {plan.createdBy} · {formatMilitaryShort(plan.modificationDate)}
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
