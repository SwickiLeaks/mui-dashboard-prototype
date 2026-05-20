import { Box, Button, Stack, Typography } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import LinkOffIcon from "@mui/icons-material/LinkOff";

import {
  ClassificationBanner,
  formatMilitaryShort,
  monoFont,
  scrollbarTacticalSx,
  tacticalSurface,
} from "../tactical";
import type { WeaponPlan } from "../types";

type OpenPlansPanelProps = {
  plans: WeaponPlan[];
  selectedPlan: WeaponPlan | null;
  onSelectPlan: (plan: WeaponPlan) => void;
  onClosePlan: (planId: string) => void;
  onCloseAllPlans: () => void;
  onOpenLibrary: () => void;
  onOpenAssociation: (planId: string) => void;
  onDisassociate: (fromPlanId: string, refId: string) => void;
};

const PANEL_ACCENT = "#90caf9";

const microActionSx = {
  height: 24,
  px: 0.85,
  minWidth: 0,
  borderRadius: 0.5,
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.1,
  textTransform: "uppercase",
  color: "text.secondary",
  bgcolor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  whiteSpace: "nowrap",
  "& .MuiButton-startIcon": {
    marginRight: "4px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.08)",
    color: "text.primary",
    borderColor: "rgba(255,255,255,0.2)",
  },
} as const;

const dangerMicroActionSx = {
  ...microActionSx,
  "&:hover": {
    color: "#ff8a8a",
    bgcolor: "rgba(255,120,120,0.08)",
    borderColor: "rgba(255,120,120,0.3)",
  },
} as const;

const closeButtonSx = {
  height: 28,
  px: 1.25,
  borderRadius: 0.5,
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.4,
  textTransform: "uppercase",
  color: "#ff8a8a",
  bgcolor: "rgba(255,120,120,0.08)",
  border: "1px solid rgba(255,120,120,0.28)",
  "& .MuiButton-startIcon": {
    marginRight: "6px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,120,120,0.14)",
    borderColor: "rgba(255,120,120,0.45)",
  },
} as const;

const closeAllButtonSx = {
  height: 26,
  px: 1,
  borderRadius: 0.5,
  fontFamily: monoFont,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1.3,
  textTransform: "uppercase",
  color: "#ff8a8a",
  bgcolor: "rgba(255,120,120,0.06)",
  border: "1px solid rgba(255,120,120,0.25)",
  "& .MuiButton-startIcon": {
    marginRight: "4px",
    marginLeft: 0,
  },
  "&:hover": {
    bgcolor: "rgba(255,120,120,0.12)",
    borderColor: "rgba(255,120,120,0.4)",
  },
} as const;

export default function OpenPlansPanel({
  plans,
  selectedPlan,
  onSelectPlan,
  onClosePlan,
  onCloseAllPlans,
  onOpenLibrary,
  onOpenAssociation,
  onDisassociate,
}: OpenPlansPanelProps) {
  const openPlans = plans.filter((plan) => plan.isOpen);
  const isEmpty = openPlans.length === 0;
  const planById = new Map(plans.map((p) => [p.id, p]));

  return (
    <>
      <ClassificationBanner
        accent={PANEL_ACCENT}
        label="OPEN PLANS"
        status={isEmpty ? "STANDBY" : `${openPlans.length} ACTIVE`}
        statusActive={!isEmpty}
        rightSlot={
          !isEmpty ? (
            <Button
              size="small"
              startIcon={<CloseIcon sx={{ fontSize: 13 }} />}
              onClick={onCloseAllPlans}
              sx={closeAllButtonSx}
            >
              Close All
            </Button>
          ) : undefined
        }
      />

      {isEmpty ? (
        <EmptyState onOpenLibrary={onOpenLibrary} />
      ) : (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            p: 1.5,
            ...scrollbarTacticalSx,
          }}
        >
          <Stack spacing={1}>
            {openPlans.map((plan) => {
              const isSelected = selectedPlan?.id === plan.id;
              const linkedPlans = plan.associatedPlanIds
                .map((id) => planById.get(id))
                .filter((p): p is WeaponPlan => Boolean(p));

              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={isSelected}
                  linkedPlans={linkedPlans}
                  onSelect={() => onSelectPlan(plan)}
                  onClose={() => onClosePlan(plan.id)}
                  onOpenAssociation={onOpenAssociation}
                  onDisassociate={onDisassociate}
                />
              );
            })}
          </Stack>
        </Box>
      )}
    </>
  );
}

function PlanCard({
  plan,
  selected,
  linkedPlans,
  onSelect,
  onClose,
  onOpenAssociation,
  onDisassociate,
}: {
  plan: WeaponPlan;
  selected: boolean;
  linkedPlans: WeaponPlan[];
  onSelect: () => void;
  onClose: () => void;
  onOpenAssociation: (id: string) => void;
  onDisassociate: (fromId: string, refId: string) => void;
}) {
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
          bgcolor: selected ? tacticalSurface.cardSelected : tacticalSurface.cardHover,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.85,
          px: 1.25,
          py: 0.7,
          bgcolor: tacticalSurface.cardHeader,
          borderBottom: `1px solid ${tacticalSurface.hairline}`,
        }}
      >
        <Box
          sx={{
            width: 3,
            height: 12,
            bgcolor: PANEL_ACCENT,
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

      <Box sx={{ p: 1.25 }}>
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
                mt: 0.5,
                pt: 1.25,
                borderTop: `1px dashed ${tacticalSurface.hairline}`,
              }}
            >
              <Stack spacing={1.25}>
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
                    <Stack spacing={0.5}>
                      {linkedPlans.map((linked) => (
                        <AssociationRow
                          key={linked.id}
                          name={linked.name}
                          isOpen={linked.isOpen}
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

function AssociationRow({
  name,
  isOpen,
  onOpen,
  onUnlink,
}: {
  name: string;
  isOpen: boolean;
  onOpen: () => void;
  onUnlink: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 0.55,
        px: 0.85,
        borderRadius: 0.5,
        bgcolor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "background-color 140ms ease, border-color 140ms ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.14)",
        },
      }}
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          bgcolor: "rgba(144,202,249,0.08)",
          color: "#90caf9",
          border: "1px solid rgba(144,202,249,0.22)",
        }}
      >
        <ArticleIcon sx={{ fontSize: 12 }} />
      </Box>
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={0.75}
        sx={{ minWidth: 0, flex: 1 }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>
          {name}
        </Typography>
        {isOpen && (
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.4,
              color: "#a5d6a7",
              flexShrink: 0,
            }}
          >
            ACTIVE
          </Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
        <Button
          size="small"
          startIcon={<LaunchIcon sx={{ fontSize: 12 }} />}
          onClick={onOpen}
          sx={microActionSx}
        >
          Open
        </Button>
        <Button
          size="small"
          startIcon={<LinkOffIcon sx={{ fontSize: 12 }} />}
          onClick={onUnlink}
          sx={dangerMicroActionSx}
        >
          Unlink
        </Button>
      </Stack>
    </Box>
  );
}

function EmptyState({ onOpenLibrary }: { onOpenLibrary: () => void }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 360,
          p: 3,
          bgcolor: tacticalSurface.card,
          border: `1px solid ${tacticalSurface.border}`,
          borderRadius: 0.5,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            background: `repeating-linear-gradient(135deg, ${PANEL_ACCENT} 0 1px, transparent 1px 7px)`,
            pointerEvents: "none",
          }}
        />

        <Stack
          spacing={2}
          alignItems="center"
          sx={{ position: "relative", textAlign: "center" }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 0.5,
              display: "grid",
              placeItems: "center",
              bgcolor: `${PANEL_ACCENT}1c`,
              color: PANEL_ACCENT,
              border: `1px solid ${PANEL_ACCENT}55`,
            }}
          >
            <BookmarkIcon sx={{ fontSize: 25 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 11,
                letterSpacing: 1.8,
                fontWeight: 700,
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              WORKSPACE STANDBY
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 0.4,
                lineHeight: 1.3,
              }}
            >
              No plans active
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
                mt: 0.75,
                lineHeight: 1.55,
              }}
            >
              Browse the Library to deploy plans into the active workspace.
            </Typography>
          </Box>

          <Button
            startIcon={<BookmarkIcon sx={{ fontSize: 15 }} />}
            onClick={onOpenLibrary}
            sx={{
              fontFamily: monoFont,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: "#0f0f0f",
              bgcolor: PANEL_ACCENT,
              border: `1px solid ${PANEL_ACCENT}`,
              borderRadius: 0.5,
              px: 2,
              py: 0.75,
              minWidth: 180,
              "& .MuiButton-startIcon": { mr: 0.85 },
              "&:hover": {
                bgcolor: PANEL_ACCENT,
                filter: "brightness(1.1)",
              },
            }}
          >
            Open Library
          </Button>

          <Stack direction="row" spacing={0.75} alignItems="center">
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 10,
                letterSpacing: 1.4,
                color: "text.secondary",
              }}
            >
              OR PRESS
            </Typography>
            <Box
              component="span"
              sx={{
                px: 0.85,
                py: 0.15,
                borderRadius: 0.5,
                fontFamily: monoFont,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.4,
                color: "text.secondary",
                bgcolor: "#242424",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              F3
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
