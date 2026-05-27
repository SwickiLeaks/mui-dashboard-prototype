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
import LinkIcon from "@mui/icons-material/Link";
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
          ? "inset 0 1px 4px rgba(0,0,0,0.5)"
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
      <Box sx={{ p: 1.75 }}>
        <Stack spacing={1.25}>
          <Stack direction="row" alignItems="center" gap={1}>
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
            {selected && (
              <Box
                sx={{
                  px: 0.85,
                  py: 0.25,
                  borderRadius: 0.5,
                  fontFamily: monoFont,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.1,
                  color: "#90caf9",
                  bgcolor: "rgba(144,202,249,0.12)",
                  border: "1px solid rgba(144,202,249,0.4)",
                  flexShrink: 0,
                }}
              >
                Active
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
                width: 26,
                height: 26,
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
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
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
                        <LinkIcon sx={{ fontSize: 17 }} />
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: monoFont,
                          fontSize: 13.5,
                          fontWeight: 700,
                          letterSpacing: 0.2,
                          color: "text.primary",
                          lineHeight: 1.2,
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        Associated plans
                      </Typography>
                      <Box
                        sx={{
                          minWidth: 26,
                          height: 22,
                          px: 0.85,
                          borderRadius: 0.5,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.14)",
                          color: "text.primary",
                          fontFamily: monoFont,
                          fontSize: 12,
                          fontWeight: 700,
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {associatedPlans.length}
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
                  <SectionLabel>Actions</SectionLabel>
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
        fontSize: 12.5,
        letterSpacing: 0.2,
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
        justifyContent: "flex-start",
        gap: 0.5,
        px: 0.75,
        pt: 1,
        pb: 0.85,
        minHeight: 58,
        borderRadius: 0.5,
        bgcolor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "text.secondary",
        transition:
          "background-color 140ms ease, border-color 160ms ease, color 140ms ease",
        "&:hover": {
          color: "text.primary",
          bgcolor: "rgba(255,255,255,0.08)",
          borderColor: "rgba(255,255,255,0.22)",
        },
      }}
    >
      <Box
        sx={{
          height: 18,
          display: "flex",
          alignItems: "center",
          "& > svg": { fontSize: 16 },
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          minHeight: 30,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.1,
            textAlign: "center",
            lineHeight: 1.3,
            color: "inherit",
          }}
        >
          {label}
        </Typography>
      </Box>
    </ButtonBase>
  );
}

