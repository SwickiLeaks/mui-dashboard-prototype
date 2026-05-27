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
        bgcolor: selected ? "#2a3139" : tacticalSurface.card,
        border: `1.5px solid ${
          selected ? "rgba(144,202,249,0.6)" : "transparent"
        }`,
        borderRadius: 3,
        boxShadow: selected
          ? "0 6px 18px rgba(0,0,0,0.4)"
          : "0 2px 6px rgba(0,0,0,0.3)",
        overflow: "hidden",
        transition:
          "background-color 160ms ease, border-color 160ms ease, box-shadow 220ms ease",
        "&:hover": {
          bgcolor: selected ? "#2a3139" : tacticalSurface.cardHover,
          boxShadow: selected
            ? "0 8px 20px rgba(0,0,0,0.44)"
            : "0 6px 16px rgba(0,0,0,0.36)",
        },
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Stack spacing={1.5}>
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
                  px: 1,
                  py: 0.3,
                  borderRadius: "999px",
                  fontFamily: monoFont,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 0.1,
                  color: "#90caf9",
                  bgcolor: "rgba(144,202,249,0.16)",
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
                width: 30,
                height: 30,
                borderRadius: "50%",
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
              sx={{ mt: 0.5 }}
            >
              <Stack spacing={1.25}>
                {associatedPlans.length > 0 && (
                  <SectionTray>
                    <Box
                      onClick={() =>
                        setAssociationsExpanded((open) => !open)
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        userSelect: "none",
                        color: "text.primary",
                        transition: "color 140ms ease",
                        "&:hover .assoc-chevron": {
                          color: "text.primary",
                        },
                      }}
                    >
                      <LinkIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
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
                          minWidth: 24,
                          height: 20,
                          px: 0.85,
                          borderRadius: "999px",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "rgba(255,255,255,0.08)",
                          color: "text.primary",
                          fontFamily: monoFont,
                          fontSize: 11.5,
                          fontWeight: 700,
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {associatedPlans.length}
                      </Box>
                      <ExpandMoreIcon
                        className="assoc-chevron"
                        sx={{
                          fontSize: 19,
                          color: "text.secondary",
                          flexShrink: 0,
                          transform: associationsExpanded
                            ? "rotate(0deg)"
                            : "rotate(-90deg)",
                          transition: "transform 160ms ease, color 140ms ease",
                        }}
                      />
                    </Box>
                    <Collapse in={associationsExpanded} unmountOnExit>
                      <Stack spacing={0.75} sx={{ mt: 1.25 }}>
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
                  </SectionTray>
                )}

                <SectionTray>
                  <SectionLabel>Plan actions</SectionLabel>
                  <Box
                    sx={{
                      mt: 1,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 0.75,
                    }}
                  >
                    <ActionRow
                      icon={<FlagIcon />}
                      label="Associate mission"
                      onClick={noop}
                    />
                    <ActionRow
                      icon={<LayersIcon />}
                      label="Associate shape collection"
                      onClick={noop}
                    />
                    <ActionRow
                      icon={<ArticleIcon />}
                      label="Associate plan"
                      onClick={noop}
                    />
                  </Box>
                </SectionTray>
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function SectionTray({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        bgcolor: "rgba(0,0,0,0.2)",
        borderRadius: 2.5,
        p: 1.5,
      }}
    >
      {children}
    </Box>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: monoFont,
        fontSize: 13.5,
        letterSpacing: 0.2,
        fontWeight: 700,
        color: "text.primary",
      }}
    >
      {children}
    </Typography>
  );
}

function ActionRow({
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
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: 1.25,
        px: 1.25,
        py: 1,
        minHeight: 44,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.06)",
        color: "text.secondary",
        transition: "background-color 140ms ease, color 140ms ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.11)",
          color: "text.primary",
        },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          color: "inherit",
          "& > svg": { fontSize: 18 },
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          flex: 1,
          textAlign: "left",
          fontFamily: monoFont,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: 0.1,
          color: "inherit",
        }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}

