import { Box, Button, Stack, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { categoryColor } from "../../../categoryColors";
import { monoFont, tacticalSurface } from "../../../theme";
import { formatMilitaryShort } from "../../../utils/formatting";
import type { WeaponPlan } from "../../../types";
import { closeButtonSx } from "../styles";
import AssociationRow from "./AssociationRow";

type PlanCardProps = {
  plan: WeaponPlan;
  selected: boolean;
  linkedPlans: WeaponPlan[];
  onSelect: () => void;
  onClose: () => void;
  onOpenAssociation: (id: string) => void;
  onDisassociate: (fromId: string, refId: string) => void;
};

export default function PlanCard({
  plan,
  selected,
  linkedPlans,
  onSelect,
  onClose,
  onOpenAssociation,
  onDisassociate,
}: PlanCardProps) {
  const accent = categoryColor[plan.category];
  return (
    <Box
      onClick={onSelect}
      sx={{
        cursor: "pointer",
        bgcolor: selected ? tacticalSurface.cardSelected : tacticalSurface.card,
        border: `1px solid ${
          selected ? "rgba(255,255,255,0.35)" : tacticalSurface.border
        }`,
        borderRadius: 0.5,
        boxShadow: selected
          ? "0 0 0 1px rgba(255,255,255,0.18), 0 8px 22px rgba(0,0,0,0.45)"
          : "none",
        overflow: "hidden",
        transition:
          "background-color 140ms ease, border-color 160ms ease, box-shadow 200ms ease",
        "&:hover": {
          borderColor: selected
            ? "rgba(255,255,255,0.4)"
            : tacticalSurface.borderHover,
          bgcolor: selected
            ? tacticalSurface.cardSelected
            : tacticalSurface.cardHover,
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
          sx={{
            width: 3,
            height: 14,
            bgcolor: accent,
            flexShrink: 0,
          }}
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
        {selected && (
          <Box
            sx={{
              px: 0.85,
              py: 0.25,
              borderRadius: 0.5,
              fontFamily: monoFont,
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: 1.4,
              color: "#a5d6a7",
              bgcolor: "rgba(165,214,167,0.12)",
              border: "1px solid rgba(165,214,167,0.4)",
              flexShrink: 0,
            }}
          >
            ACTIVE
          </Box>
        )}
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 10.5,
            letterSpacing: 1.1,
            fontWeight: 700,
            color: "text.secondary",
            flexShrink: 0,
          }}
        >
          {formatMilitaryShort(plan.modificationDate)}
        </Typography>
      </Box>

      <Box sx={{ p: 1.75 }}>
        <Stack spacing={1.25}>
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: 10.5,
              letterSpacing: 1.2,
              fontWeight: 700,
              color: "text.secondary",
            }}
          >
            DRAFTED BY {plan.createdBy.toUpperCase()}
          </Typography>

          <Typography
            sx={{ color: "text.secondary", fontSize: 13.5, lineHeight: 1.55 }}
          >
            {plan.description}
          </Typography>

          {selected && (
            <Box
              onClick={(event) => event.stopPropagation()}
              sx={{
                mt: 0.75,
                pt: 1.5,
                borderTop: `1px dashed ${tacticalSurface.hairline}`,
              }}
            >
              <Stack spacing={1.5}>
                {linkedPlans.length > 0 ? (
                  <>
                    <Typography
                      sx={{
                        fontFamily: monoFont,
                        fontSize: 10.5,
                        letterSpacing: 1.4,
                        fontWeight: 700,
                        color: "text.secondary",
                      }}
                    >
                      LINKED PLANS · {linkedPlans.length}
                    </Typography>
                    <Stack spacing={0.75}>
                      {linkedPlans.map((linked) => (
                        <AssociationRow
                          key={linked.id}
                          name={linked.name}
                          isOpen={linked.isOpen}
                          accent={categoryColor[linked.category]}
                          onOpen={() => onOpenAssociation(linked.id)}
                          onUnlink={() => onDisassociate(plan.id, linked.id)}
                        />
                      ))}
                    </Stack>
                  </>
                ) : (
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: 11,
                      letterSpacing: 1.2,
                      color: "text.secondary",
                    }}
                  >
                    NO LINKED PLANS
                  </Typography>
                )}

                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    size="small"
                    startIcon={<CloseIcon sx={{ fontSize: 13 }} />}
                    onClick={onClose}
                    sx={closeButtonSx}
                  >
                    Close Plan
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
