import { useEffect, useState } from "react";
import {
  Box,
  ButtonBase,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagIcon from "@mui/icons-material/Flag";
import HubIcon from "@mui/icons-material/Hub";
import LayersIcon from "@mui/icons-material/Layers";

import { categoryColor } from "../../../categoryColors";
import { monoFont, tacticalSurface } from "../../../theme";
import { formatMilitaryShort } from "../../../utils/formatting";
import type { WeaponPlan } from "../../../types";
import AssociationRow from "./AssociationRow";

const noop = () => {};

type PlanCardProps = {
  plan: WeaponPlan;
  selected: boolean;
  associatedPlans: WeaponPlan[];
  onSelect: () => void;
  onClose: () => void;
  onOpenAssociation: (id: string) => void;
  onDisassociate: (fromId: string, refId: string) => void;
};

export default function PlanCard({
  plan,
  selected,
  associatedPlans,
  onSelect,
  onClose,
  onOpenAssociation,
  onDisassociate,
}: PlanCardProps) {
  const accent = categoryColor[plan.category];
  const [associationsExpanded, setAssociationsExpanded] = useState(false);

  useEffect(() => {
    if (!selected) setAssociationsExpanded(false);
  }, [selected]);
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
              color: "#90caf9",
              bgcolor: "rgba(144,202,249,0.12)",
              border: "1px solid rgba(144,202,249,0.4)",
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
                {associatedPlans.length > 0 && (
                  <Stack spacing={associationsExpanded ? 1 : 0}>
                    <Box
                      onClick={() =>
                        setAssociationsExpanded((open) => !open)
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        px: 1.25,
                        py: 1,
                        borderRadius: 0.5,
                        bgcolor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        cursor: "pointer",
                        userSelect: "none",
                        transition:
                          "background-color 140ms ease, border-color 140ms ease",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.08)",
                          borderColor: "rgba(255,255,255,0.22)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 0.5,
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                          bgcolor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "text.secondary",
                        }}
                      >
                        <HubIcon sx={{ fontSize: 17 }} />
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: monoFont,
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: 1.3,
                            textTransform: "uppercase",
                            color: "text.primary",
                            lineHeight: 1.2,
                          }}
                        >
                          Associated Plans
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 11.5,
                            color: "text.secondary",
                            mt: 0.25,
                            lineHeight: 1.2,
                          }}
                        >
                          {associatedPlans.length}{" "}
                          {associatedPlans.length === 1 ? "plan" : "plans"}
                          {associatedPlans.some((p) => p.isOpen) &&
                            ` · ${
                              associatedPlans.filter((p) => p.isOpen).length
                            } open`}
                        </Typography>
                      </Box>
                      <ExpandMoreIcon
                        sx={{
                          fontSize: 19,
                          color: "text.secondary",
                          flexShrink: 0,
                          transform: associationsExpanded
                            ? "rotate(0deg)"
                            : "rotate(-90deg)",
                          transition: "transform 160ms ease",
                        }}
                      />
                    </Box>
                    <Collapse in={associationsExpanded} unmountOnExit>
                      <Stack spacing={0.75}>
                        {associatedPlans.map((associated) => (
                          <AssociationRow
                            key={associated.id}
                            name={associated.name}
                            isOpen={associated.isOpen}
                            accent={categoryColor[associated.category]}
                            onOpen={() => onOpenAssociation(associated.id)}
                            onDisassociate={() =>
                              onDisassociate(plan.id, associated.id)
                            }
                          />
                        ))}
                      </Stack>
                    </Collapse>
                  </Stack>
                )}

                <Stack spacing={1}>
                  <SectionLabel>ACTIONS</SectionLabel>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 0.75,
                    }}
                  >
                    <ActionTile
                      icon={<FlagIcon />}
                      label="Associate Mission"
                      onClick={noop}
                    />
                    <ActionTile
                      icon={<LayersIcon />}
                      label="Associate Shape Collection"
                      onClick={noop}
                    />
                    <ActionTile
                      icon={<ArticleIcon />}
                      label="Associate Plan"
                      onClick={noop}
                    />
                  </Box>
                </Stack>
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

function ActionTile({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.65,
        px: 0.5,
        py: 1.1,
        minHeight: 72,
        borderRadius: 0.5,
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "text.secondary",
        transition:
          "background-color 140ms ease, border-color 160ms ease, color 140ms ease",
        "& > svg": { fontSize: 18 },
        "&:hover": {
          color: "text.primary",
          bgcolor: "rgba(255,255,255,0.08)",
          borderColor: "rgba(255,255,255,0.22)",
        },
      }}
    >
      {icon}
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.25,
          color: "inherit",
        }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}

