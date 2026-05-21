import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LayersIcon from "@mui/icons-material/Layers";

import { categoryColor } from "../../../categoryColors";
import { StatPill, monoFont, tacticalSurface } from "../../../theme";
import { formatMilitaryShort } from "../../../utils/formatting";
import type { WeaponPlan } from "../../../types";
import AssociationRow from "./AssociationRow";

const noop = () => {};

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
          py: 0.85,
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
        <IconButton
          size="small"
          title="Close plan"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          sx={{
            width: 24,
            height: 24,
            borderRadius: 0.5,
            color: "text.secondary",
            flexShrink: 0,
            transition: "color 140ms ease, background-color 140ms ease",
            "&:hover": {
              color: "#ff8a8a",
              bgcolor: "rgba(255,120,120,0.12)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>
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
            DRAFTED BY {plan.createdBy.toUpperCase()} ·{" "}
            {formatMilitaryShort(plan.modificationDate)}
          </Typography>

          <Stack direction="row" spacing={0.85}>
            <StatPill
              icon={<ChangeHistoryIcon sx={{ fontSize: 14 }} />}
              label="RELEASES"
              count={plan.releases.length}
            />
            <StatPill
              icon={<GpsFixedIcon sx={{ fontSize: 14 }} />}
              label="TARGETS"
              count={plan.targets.length}
            />
          </Stack>

          <Typography sx={{ color: "text.secondary", fontSize: 13.5, lineHeight: 1.55 }}>
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
              <Stack spacing={1.75}>
                <Stack spacing={1}>
                  <SectionLabel>ACTIONS</SectionLabel>
                  <Stack spacing={0.75}>
                    <ActionButton
                      icon={<FlagIcon sx={{ fontSize: 14 }} />}
                      label="Associate Mission"
                      onClick={noop}
                    />
                    <ActionButton
                      icon={<LayersIcon sx={{ fontSize: 14 }} />}
                      label="Associate Shape Collection"
                      onClick={noop}
                    />
                    <ActionButton
                      icon={<ArticleIcon sx={{ fontSize: 14 }} />}
                      label="Associate Plan"
                      onClick={noop}
                    />
                  </Stack>
                </Stack>

                {linkedPlans.length > 0 && (
                  <Stack spacing={1}>
                    <SectionLabel>LINKED PLANS · {linkedPlans.length}</SectionLabel>
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
                  </Stack>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: monoFont,
        fontSize: 10.5,
        letterSpacing: 1.4,
        fontWeight: 700,
        color: "text.secondary",
      }}
    >
      {children}
    </Typography>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      startIcon={icon}
      onClick={onClick}
      fullWidth
      sx={{
        height: 34,
        justifyContent: "flex-start",
        px: 1.25,
        borderRadius: 0.5,
        fontFamily: monoFont,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.3,
        textTransform: "uppercase",
        color: "text.secondary",
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        transition:
          "background-color 140ms ease, border-color 160ms ease, color 140ms ease",
        "& .MuiButton-startIcon": {
          mr: 1.1,
          marginLeft: 0,
        },
        "&:hover": {
          color: "text.primary",
          bgcolor: "rgba(255,255,255,0.08)",
          borderColor: "rgba(255,255,255,0.22)",
        },
      }}
    >
      {label}
    </Button>
  );
}

