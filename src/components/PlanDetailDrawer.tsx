import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import {
  ClassificationBanner,
  TacticalSection,
  monoFont,
  scrollbarTacticalSx,
  tacticalSurface,
} from "../tactical";
import type {
  WeaponPlan,
  PlanCategory,
  Release,
  ReleaseStatus,
  Target,
  TargetPriority,
} from "../types";

type PlanDetailDrawerProps = {
  plan: WeaponPlan;
  plans: WeaponPlan[];
  onClose: () => void;
  onUpdatePlan: (plan: WeaponPlan) => void;
};

type Selection =
  | { kind: "release"; releaseId: string }
  | { kind: "target"; releaseId: string; targetId: string };

const categoryColor: Record<PlanCategory, string> = {
  weapon: "#ce93d8",
  network: "#a5d6a7",
  comm: "#ffcc80",
  e2: "#ef9a9a",
};

const releaseStatusOptions: Array<{ value: ReleaseStatus; label: string }> = [
  { value: "draft", label: "DRAFT" },
  { value: "approved", label: "APPROVED" },
  { value: "active", label: "ACTIVE" },
];

const releaseStatusColor: Record<ReleaseStatus, string> = {
  draft: "#9e9e9e",
  approved: "#90caf9",
  active: "#a5d6a7",
};

const targetPriorityOptions: Array<{ value: TargetPriority; label: string }> = [
  { value: "low", label: "LOW" },
  { value: "med", label: "MED" },
  { value: "high", label: "HIGH" },
];

const targetPriorityColor: Record<TargetPriority, string> = {
  low: "#9e9e9e",
  med: "#ffcc80",
  high: "#ef9a9a",
};

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function PlanDetailDrawer({
  plan,
  onClose,
  onUpdatePlan,
}: PlanDetailDrawerProps) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(
    () => new Set(plan.releases.map((r) => r.id))
  );

  useEffect(() => {
    setSelection(null);
    setExpandedReleases(new Set(plan.releases.map((r) => r.id)));
    // intentionally key only on the plan id so edits don't collapse the tree
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan.id]);

  const accent = categoryColor[plan.category];

  const toggleExpanded = (releaseId: string) => {
    setExpandedReleases((current) => {
      const next = new Set(current);
      if (next.has(releaseId)) {
        next.delete(releaseId);
      } else {
        next.add(releaseId);
      }
      return next;
    });
  };

  const handleNameChange = (newName: string) => {
    onUpdatePlan({ ...plan, name: newName });
  };

  const updateRelease = (releaseId: string, updates: Partial<Release>) => {
    onUpdatePlan({
      ...plan,
      releases: plan.releases.map((r) =>
        r.id === releaseId ? { ...r, ...updates } : r
      ),
    });
  };

  const updateTarget = (
    releaseId: string,
    targetId: string,
    updates: Partial<Target>
  ) => {
    onUpdatePlan({
      ...plan,
      releases: plan.releases.map((r) =>
        r.id === releaseId
          ? {
              ...r,
              targets: r.targets.map((t) =>
                t.id === targetId ? { ...t, ...updates } : t
              ),
            }
          : r
      ),
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: tacticalSurface.panel,
        borderLeft: "1px solid #3a3a3a",
        boxShadow: "-12px 0 32px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      <ClassificationBanner
        accent={accent}
        label="WEAPON PLAN EDITOR"
        status={plan.isOpen ? "ACTIVE" : "INACTIVE"}
        statusActive={plan.isOpen}
        onClose={onClose}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 1.5,
          ...scrollbarTacticalSx,
        }}
      >
        <Stack spacing={1.5}>
          <PlanNameSection
            value={plan.name}
            accent={accent}
            onChange={handleNameChange}
          />

          <TacticalSection label="PLAN OVERVIEW" accent={accent}>
            <PlanOverviewTree
              releases={plan.releases}
              expanded={expandedReleases}
              selection={selection}
              accent={accent}
              onToggle={toggleExpanded}
              onSelect={setSelection}
            />
          </TacticalSection>

          <SelectedItemSection
            plan={plan}
            selection={selection}
            accent={accent}
            onUpdateRelease={updateRelease}
            onUpdateTarget={updateTarget}
          />
        </Stack>
      </Box>
    </Box>
  );
}

function PlanNameSection({
  value,
  accent,
  onChange,
}: {
  value: string;
  accent: string;
  onChange: (next: string) => void;
}) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="stretch"
      sx={{
        bgcolor: "#1a1a1a",
        border: `1px solid ${tacticalSurface.border}`,
        borderRadius: 0.5,
        p: 1.25,
      }}
    >
      <Box
        sx={{
          width: 3,
          alignSelf: "stretch",
          bgcolor: accent,
          flexShrink: 0,
        }}
      />
      <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 10,
            letterSpacing: 1.6,
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          PLAN DESIGNATION
        </Typography>
        <TextField
          value={value}
          onChange={(event) => onChange(event.target.value)}
          fullWidth
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              fontFamily: monoFont,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 0.6,
              bgcolor: "#141414",
              borderRadius: 0.5,
              "& fieldset": { borderColor: tacticalSurface.border },
              "&:hover fieldset": { borderColor: tacticalSurface.borderHover },
              "&.Mui-focused fieldset": {
                borderColor: accent,
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-input": {
              py: 0.75,
              px: 1,
            },
          }}
        />
      </Stack>
    </Stack>
  );
}

function PlanOverviewTree({
  releases,
  expanded,
  selection,
  accent,
  onToggle,
  onSelect,
}: {
  releases: Release[];
  expanded: Set<string>;
  selection: Selection | null;
  accent: string;
  onToggle: (releaseId: string) => void;
  onSelect: (next: Selection) => void;
}) {
  if (releases.length === 0) {
    return (
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 11,
          letterSpacing: 1.2,
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        NO RELEASES DEFINED
      </Typography>
    );
  }

  return (
    <Stack spacing={0.5}>
      {releases.map((release, idx) => {
        const isExpanded = expanded.has(release.id);
        const isReleaseSelected =
          selection?.kind === "release" && selection.releaseId === release.id;
        return (
          <Box key={release.id}>
            <ReleaseRow
              release={release}
              index={idx}
              expanded={isExpanded}
              selected={isReleaseSelected}
              accent={accent}
              onToggle={() => onToggle(release.id)}
              onSelect={() =>
                onSelect({ kind: "release", releaseId: release.id })
              }
            />
            {isExpanded && (
              <Box
                sx={{
                  mt: 0.5,
                  ml: 1.5,
                  pl: 1.25,
                  borderLeft: "1px dashed rgba(255,255,255,0.1)",
                }}
              >
                {release.targets.length === 0 ? (
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: 10,
                      letterSpacing: 1.2,
                      color: "text.secondary",
                      fontStyle: "italic",
                      py: 0.5,
                    }}
                  >
                    NO TARGETS
                  </Typography>
                ) : (
                  <Stack spacing={0.3}>
                    {release.targets.map((target, tIdx) => {
                      const isTargetSelected =
                        selection?.kind === "target" &&
                        selection.releaseId === release.id &&
                        selection.targetId === target.id;
                      return (
                        <TargetRow
                          key={target.id}
                          target={target}
                          index={tIdx}
                          selected={isTargetSelected}
                          accent={accent}
                          onSelect={() =>
                            onSelect({
                              kind: "target",
                              releaseId: release.id,
                              targetId: target.id,
                            })
                          }
                        />
                      );
                    })}
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}

function ReleaseRow({
  release,
  index,
  expanded,
  selected,
  accent,
  onToggle,
  onSelect,
}: {
  release: Release;
  index: number;
  expanded: boolean;
  selected: boolean;
  accent: string;
  onToggle: () => void;
  onSelect: () => void;
}) {
  const statusColor = releaseStatusColor[release.status];

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        py: 0.6,
        pl: 0.4,
        pr: 0.75,
        borderRadius: 0.5,
        cursor: "pointer",
        bgcolor: selected ? `${accent}1f` : "rgba(255,255,255,0.02)",
        border: `1px solid ${
          selected ? `${accent}66` : "rgba(255,255,255,0.06)"
        }`,
        boxShadow: selected ? `0 0 0 1px ${accent}33` : "none",
        transition:
          "background-color 140ms ease, border-color 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          bgcolor: selected ? `${accent}26` : "rgba(255,255,255,0.05)",
          borderColor: selected ? `${accent}88` : "rgba(255,255,255,0.14)",
        },
      }}
    >
      <IconButton
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        sx={{
          width: 22,
          height: 22,
          borderRadius: 0.5,
          color: "text.secondary",
          flexShrink: 0,
          "&:hover": {
            color: "text.primary",
            bgcolor: "rgba(255,255,255,0.06)",
          },
        }}
      >
        {expanded ? (
          <ExpandMoreIcon sx={{ fontSize: 16 }} />
        ) : (
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        )}
      </IconButton>

      <Box
        sx={{
          minWidth: 26,
          height: 22,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          fontFamily: monoFont,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 0.6,
          flexShrink: 0,
          bgcolor: `${accent}1c`,
          border: `1px solid ${accent}55`,
          color: accent,
        }}
      >
        {pad2(index + 1)}
      </Box>

      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 11.5,
          letterSpacing: 1.1,
          fontWeight: 700,
          color: "text.primary",
          minWidth: 0,
          flex: 1,
        }}
        noWrap
      >
        {release.name.toUpperCase()}
      </Typography>

      <Box
        sx={{
          px: 0.75,
          py: 0.2,
          borderRadius: 0.5,
          flexShrink: 0,
          bgcolor: `${statusColor}1a`,
          border: `1px solid ${statusColor}55`,
          color: statusColor,
          fontFamily: monoFont,
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: 1.3,
        }}
      >
        {release.status.toUpperCase()}
      </Box>

      <Box
        sx={{
          minWidth: 24,
          height: 20,
          px: 0.65,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          fontFamily: monoFont,
          fontSize: 10,
          fontWeight: 700,
          color: "text.secondary",
          bgcolor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        {release.targets.length}
      </Box>
    </Box>
  );
}

function TargetRow({
  target,
  index,
  selected,
  accent,
  onSelect,
}: {
  target: Target;
  index: number;
  selected: boolean;
  accent: string;
  onSelect: () => void;
}) {
  const priorityColor = targetPriorityColor[target.priority];

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        py: 0.45,
        px: 0.75,
        borderRadius: 0.5,
        cursor: "pointer",
        bgcolor: selected ? `${accent}1f` : "transparent",
        border: `1px solid ${selected ? `${accent}66` : "transparent"}`,
        transition: "background-color 140ms ease, border-color 160ms ease",
        "&:hover": {
          bgcolor: selected ? `${accent}26` : "rgba(255,255,255,0.04)",
          borderColor: selected ? `${accent}88` : "rgba(255,255,255,0.08)",
        },
      }}
    >
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          bgcolor: "rgba(255,255,255,0.04)",
          color: "text.secondary",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <GpsFixedIcon sx={{ fontSize: 10 }} />
      </Box>

      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 10,
          letterSpacing: 1,
          fontWeight: 700,
          color: "text.secondary",
          flexShrink: 0,
        }}
      >
        T-{pad2(index + 1)}
      </Typography>

      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 11,
          letterSpacing: 0.8,
          fontWeight: 600,
          color: "text.primary",
          minWidth: 0,
          flex: 1,
        }}
        noWrap
      >
        {target.name.toUpperCase()}
      </Typography>

      <Box
        sx={{
          px: 0.7,
          py: 0.15,
          borderRadius: 0.5,
          flexShrink: 0,
          bgcolor: `${priorityColor}1a`,
          border: `1px solid ${priorityColor}55`,
          color: priorityColor,
          fontFamily: monoFont,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1.3,
        }}
      >
        {target.priority.toUpperCase()}
      </Box>
    </Box>
  );
}

function SelectedItemSection({
  plan,
  selection,
  accent,
  onUpdateRelease,
  onUpdateTarget,
}: {
  plan: WeaponPlan;
  selection: Selection | null;
  accent: string;
  onUpdateRelease: (releaseId: string, updates: Partial<Release>) => void;
  onUpdateTarget: (
    releaseId: string,
    targetId: string,
    updates: Partial<Target>
  ) => void;
}) {
  if (!selection) {
    return (
      <TacticalSection label="DETAILS" accent={accent}>
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: 11,
            letterSpacing: 1.2,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          SELECT A RELEASE OR TARGET ABOVE TO INSPECT.
        </Typography>
      </TacticalSection>
    );
  }

  if (selection.kind === "release") {
    const release = plan.releases.find((r) => r.id === selection.releaseId);
    if (!release) return null;
    return (
      <TacticalSection label="RELEASE DETAILS" accent={accent}>
        <Stack spacing={1.25}>
          <TacticalTextField
            label="NAME"
            value={release.name}
            accent={accent}
            onChange={(v) => onUpdateRelease(release.id, { name: v })}
          />
          <TacticalTextField
            label="DESCRIPTION"
            value={release.description}
            accent={accent}
            multiline
            rows={2}
            onChange={(v) => onUpdateRelease(release.id, { description: v })}
          />
          <TacticalSelect
            label="STATUS"
            value={release.status}
            accent={accent}
            options={releaseStatusOptions}
            valueColor={releaseStatusColor[release.status]}
            onChange={(v) =>
              onUpdateRelease(release.id, { status: v as ReleaseStatus })
            }
          />
        </Stack>
      </TacticalSection>
    );
  }

  const release = plan.releases.find((r) => r.id === selection.releaseId);
  const target = release?.targets.find((t) => t.id === selection.targetId);
  if (!release || !target) return null;
  return (
    <TacticalSection label="TARGET DETAILS" accent={accent}>
      <Stack spacing={1.25}>
        <TacticalTextField
          label="NAME"
          value={target.name}
          accent={accent}
          onChange={(v) => onUpdateTarget(release.id, target.id, { name: v })}
        />
        <TacticalTextField
          label="COORDINATES"
          value={target.coordinates}
          accent={accent}
          onChange={(v) =>
            onUpdateTarget(release.id, target.id, { coordinates: v })
          }
        />
        <TacticalSelect
          label="PRIORITY"
          value={target.priority}
          accent={accent}
          options={targetPriorityOptions}
          valueColor={targetPriorityColor[target.priority]}
          onChange={(v) =>
            onUpdateTarget(release.id, target.id, {
              priority: v as TargetPriority,
            })
          }
        />
        <TacticalTextField
          label="NOTES"
          value={target.notes}
          accent={accent}
          multiline
          rows={3}
          onChange={(v) => onUpdateTarget(release.id, target.id, { notes: v })}
        />
      </Stack>
    </TacticalSection>
  );
}

function TacticalTextField({
  label,
  value,
  accent,
  multiline,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  accent: string;
  multiline?: boolean;
  rows?: number;
  onChange: (next: string) => void;
}) {
  return (
    <Stack spacing={0.5}>
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 10,
          letterSpacing: 1.3,
          fontWeight: 700,
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        size="small"
        multiline={multiline}
        minRows={rows}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            fontFamily: monoFont,
            fontSize: 12.5,
            letterSpacing: 0.4,
            bgcolor: "#141414",
            borderRadius: 0.5,
            "& fieldset": { borderColor: tacticalSurface.border },
            "&:hover fieldset": { borderColor: tacticalSurface.borderHover },
            "&.Mui-focused fieldset": {
              borderColor: accent,
              borderWidth: 1,
            },
          },
          "& .MuiOutlinedInput-input": {
            py: multiline ? 0 : 0.75,
            px: 1,
          },
        }}
      />
    </Stack>
  );
}

function TacticalSelect({
  label,
  value,
  accent,
  options,
  valueColor,
  onChange,
}: {
  label: string;
  value: string;
  accent: string;
  options: Array<{ value: string; label: string }>;
  valueColor?: string;
  onChange: (next: string) => void;
}) {
  return (
    <Stack spacing={0.5}>
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 10,
          letterSpacing: 1.3,
          fontWeight: 700,
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <TextField
        select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        size="small"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            fontFamily: monoFont,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: valueColor ?? "text.primary",
            bgcolor: "#141414",
            borderRadius: 0.5,
            "& fieldset": { borderColor: tacticalSurface.border },
            "&:hover fieldset": { borderColor: tacticalSurface.borderHover },
            "&.Mui-focused fieldset": {
              borderColor: accent,
              borderWidth: 1,
            },
          },
          "& .MuiOutlinedInput-input": {
            py: 0.75,
            px: 1,
          },
        }}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                bgcolor: "#1c1c1c",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 0.5,
                backgroundImage: "none",
                mt: 0.5,
              },
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              fontFamily: monoFont,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 1.2,
              color: "text.secondary",
              "&.Mui-selected": {
                bgcolor: "#2a2a2a",
                color: "text.primary",
              },
              "&.Mui-selected:hover, &:hover": {
                bgcolor: "#262626",
                color: "text.primary",
              },
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
