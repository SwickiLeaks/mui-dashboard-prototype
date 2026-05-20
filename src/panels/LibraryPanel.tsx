import { useMemo, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BoltIcon from "@mui/icons-material/Bolt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import FilterListIcon from "@mui/icons-material/FilterList";
import GroupsIcon from "@mui/icons-material/Groups";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonIcon from "@mui/icons-material/Person";
import RouterIcon from "@mui/icons-material/Router";
import ShieldIcon from "@mui/icons-material/Shield";
import StarIcon from "@mui/icons-material/Star";

import {
  ClassificationBanner,
  formatMilitaryShort,
  monoFont,
  scrollbarTacticalSx,
  tacticalSurface,
} from "../tactical";
import type { LibraryBucket, PlanCategory, WeaponPlan } from "../types";

type PlanFilter = "all" | "open" | "closed";

type LibraryPath = {
  bucket?: LibraryBucket;
  crew?: string;
  category?: PlanCategory;
};

type View = "root" | "categories" | "crew" | "items";

type BucketMeta = {
  key: LibraryBucket;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
};

type CategoryMeta = {
  key: PlanCategory;
  label: string;
  description: string;
  icon: React.ReactNode;
};

const LIBRARY_DEFAULT_ACCENT = "#ffd54f";

const buckets: BucketMeta[] = [
  {
    key: "standards",
    label: "Squadron Standards",
    description: "Approved templates released by the squadron.",
    icon: <ShieldIcon />,
    accent: "#90caf9",
  },
  {
    key: "myItems",
    label: "My Items",
    description: "Plans you've authored or own.",
    icon: <PersonIcon />,
    accent: "#a5d6a7",
  },
  {
    key: "favorites",
    label: "My Favorites",
    description: "Bookmarked for quick access.",
    icon: <StarIcon />,
    accent: "#ffcc80",
  },
  {
    key: "aircrew",
    label: "Aircrew Folders",
    description: "Plans grouped by crew member.",
    icon: <GroupsIcon />,
    accent: "#ce93d8",
  },
];

const categories: CategoryMeta[] = [
  {
    key: "weapon",
    label: "Weapon Plans Library",
    description: "LRASM and GBU-X strike packages and engagement profiles.",
    icon: <TrackChangesIcon />,
  },
  {
    key: "network",
    label: "Network Plans Library",
    description: "Tactical data link routing and topology layouts.",
    icon: <AccountTreeIcon />,
  },
  {
    key: "comm",
    label: "Comms Plan Library",
    description: "Radio assignments and weapon comms coordination.",
    icon: <RouterIcon />,
  },
  {
    key: "e2",
    label: "E2 Link 16 Event Library",
    description: "E-2 Hawkeye Link 16 events and track-sharing plans.",
    icon: <BoltIcon />,
  },
];

const scopeForPath = (
  plans: WeaponPlan[],
  path: LibraryPath
): WeaponPlan[] => {
  return plans.filter((plan) => {
    if (path.bucket === "standards") return plan.isStandard;
    if (path.bucket === "myItems") return plan.isMine;
    if (path.bucket === "favorites") return plan.isFavorite;
    if (path.bucket === "aircrew")
      return path.crew ? plan.createdBy === path.crew : true;
    return true;
  });
};

const getView = (path: LibraryPath): View => {
  if (!path.bucket) return "root";
  if (path.bucket === "aircrew" && !path.crew) return "crew";
  if (!path.category) return "categories";
  return "items";
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((segment) => segment[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

type LibraryPanelProps = {
  plans: WeaponPlan[];
  onOpenPlans: (planIds: string[]) => void;
  onClose: () => void;
};

export default function LibraryPanel({
  plans,
  onOpenPlans,
  onClose,
}: LibraryPanelProps) {
  const [path, setPath] = useState<LibraryPath>({});
  const [pendingPlanIds, setPendingPlanIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<PlanFilter>("all");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const view = getView(path);
  const bucketMeta = buckets.find((b) => b.key === path.bucket);
  const categoryMeta = categories.find((c) => c.key === path.category);
  const accent = bucketMeta?.accent ?? LIBRARY_DEFAULT_ACCENT;

  const bucketCounts = useMemo(
    () =>
      ({
        standards: plans.filter((p) => p.isStandard).length,
        myItems: plans.filter((p) => p.isMine).length,
        favorites: plans.filter((p) => p.isFavorite).length,
        aircrew: plans.length,
      }) satisfies Record<LibraryBucket, number>,
    [plans]
  );

  const crewMembers = useMemo(() => {
    if (path.bucket !== "aircrew") return [];
    const counts = new Map<string, number>();
    plans.forEach((plan) => {
      counts.set(plan.createdBy, (counts.get(plan.createdBy) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [plans, path.bucket]);

  const categoryCounts = useMemo(() => {
    const scope = scopeForPath(plans, path);
    return {
      weapon: scope.filter((p) => p.category === "weapon").length,
      network: scope.filter((p) => p.category === "network").length,
      comm: scope.filter((p) => p.category === "comm").length,
      e2: scope.filter((p) => p.category === "e2").length,
    } satisfies Record<PlanCategory, number>;
  }, [plans, path]);

  const items = useMemo(() => {
    if (view !== "items") return [];
    const scope = scopeForPath(plans, path).filter(
      (p) => p.category === path.category
    );
    if (filter === "open") return scope.filter((p) => p.isOpen);
    if (filter === "closed") return scope.filter((p) => !p.isOpen);
    return scope;
  }, [plans, path, view, filter]);

  const pendingPlans = useMemo(
    () => plans.filter((p) => pendingPlanIds.includes(p.id)),
    [plans, pendingPlanIds]
  );
  const hasSelection = pendingPlans.length > 0;

  const clearSelection = () => setPendingPlanIds([]);

  const goRoot = () => {
    setPath({});
    clearSelection();
  };
  const goBucket = () => {
    setPath({ bucket: path.bucket });
    clearSelection();
  };
  const goCrew = () => {
    setPath({ bucket: path.bucket, crew: path.crew });
    clearSelection();
  };
  const enterBucket = (bucket: LibraryBucket) => {
    setPath({ bucket });
    clearSelection();
  };
  const enterCrew = (crew: string) => {
    setPath({ ...path, crew });
    clearSelection();
  };
  const enterCategory = (category: PlanCategory) => {
    setPath({ ...path, category });
    clearSelection();
  };

  const togglePlan = (id: string) => {
    setPendingPlanIds((current) =>
      current.includes(id)
        ? current.filter((existing) => existing !== id)
        : [...current, id]
    );
  };

  const pathKey = [path.bucket ?? "root", path.crew ?? "", path.category ?? ""].join("|");
  const bucketIsCurrent =
    path.bucket === "aircrew" ? view === "crew" : view === "categories";

  const statusLabel = (() => {
    if (view === "root") return "BROWSE";
    if (view === "categories") return bucketMeta?.label.toUpperCase() ?? "";
    if (view === "crew") return "AIRCREW";
    return categoryMeta?.label.toUpperCase() ?? "";
  })();

  return (
    <>
      <ClassificationBanner
        accent={accent}
        label="LIBRARY"
        status={statusLabel}
      />

      <Box
        sx={{
          px: 1.5,
          py: 1,
          bgcolor: "#1a1a1a",
          borderBottom: `1px solid ${tacticalSurface.hairline}`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon
              sx={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}
            />
          }
          sx={{
            minWidth: 0,
            "& .MuiBreadcrumbs-li": { display: "flex", alignItems: "center" },
            "& .MuiBreadcrumbs-ol": {
              flexWrap: "nowrap",
              overflow: "hidden",
            },
          }}
        >
          <BreadcrumbSegment
            label="LIBRARY"
            isCurrent={view === "root"}
            onClick={view === "root" ? undefined : goRoot}
          />
          {path.bucket && bucketMeta && (
            <BreadcrumbSegment
              label={bucketMeta.label.toUpperCase()}
              isCurrent={bucketIsCurrent}
              onClick={bucketIsCurrent ? undefined : goBucket}
            />
          )}
          {path.crew && (
            <BreadcrumbSegment
              label={path.crew.toUpperCase()}
              isCurrent={view === "categories"}
              onClick={view === "categories" ? undefined : goCrew}
            />
          )}
          {path.category && categoryMeta && (
            <BreadcrumbSegment
              label={categoryMeta.label.toUpperCase()}
              isCurrent
            />
          )}
        </Breadcrumbs>

        {view === "items" && (
          <FilterButton
            filter={filter}
            anchorEl={filterAnchorEl}
            onOpen={(event) => setFilterAnchorEl(event.currentTarget)}
            onClose={() => setFilterAnchorEl(null)}
            onChange={(value) => {
              setFilter(value);
              clearSelection();
              setFilterAnchorEl(null);
            }}
          />
        )}
      </Box>

      <Box
        key={pathKey}
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          animation: "viewSwap 200ms ease-out",
          "@keyframes viewSwap": {
            from: { opacity: 0, transform: "translateY(6px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {view === "root" && (
          <BucketGrid counts={bucketCounts} onSelect={enterBucket} />
        )}
        {view === "categories" && (
          <CategoryList
            counts={categoryCounts}
            accent={accent}
            onSelect={enterCategory}
          />
        )}
        {view === "crew" && (
          <CrewList
            crewMembers={crewMembers}
            accent={accent}
            onSelect={enterCrew}
          />
        )}
        {view === "items" && (
          <ItemList
            plans={items}
            filter={filter}
            pendingPlanIds={pendingPlanIds}
            accent={accent}
            onToggle={togglePlan}
          />
        )}
      </Box>

      {view === "items" && (
        <FooterBar
          accent={accent}
          hasSelection={hasSelection}
          count={pendingPlans.length}
          onCancel={onClose}
          onConfirm={() => onOpenPlans(pendingPlans.map((p) => p.id))}
        />
      )}
    </>
  );
}

function BreadcrumbSegment({
  label,
  isCurrent,
  onClick,
}: {
  label: string;
  isCurrent?: boolean;
  onClick?: () => void;
}) {
  const sx = {
    fontFamily: monoFont,
    fontSize: 10.5,
    letterSpacing: 1.3,
    fontWeight: 700,
    maxWidth: 180,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  if (isCurrent || !onClick) {
    return (
      <Typography sx={{ ...sx, color: "text.primary" }}>{label}</Typography>
    );
  }

  return (
    <Typography
      onClick={onClick}
      sx={{
        ...sx,
        cursor: "pointer",
        color: "text.secondary",
        "&:hover": { color: "text.primary" },
      }}
    >
      {label}
    </Typography>
  );
}

function CountChip({ count, accent }: { count: number; accent: string }) {
  const populated = count > 0;
  return (
    <Box
      sx={{
        minWidth: 30,
        height: 22,
        px: 0.85,
        borderRadius: 0.5,
        display: "grid",
        placeItems: "center",
        bgcolor: populated ? `${accent}1c` : "rgba(255,255,255,0.04)",
        border: `1px solid ${populated ? `${accent}55` : "rgba(255,255,255,0.08)"}`,
        color: populated ? accent : "text.secondary",
        fontFamily: monoFont,
        fontSize: 11.5,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: 0.8,
        flexShrink: 0,
      }}
    >
      {count}
    </Box>
  );
}

const cardOuterSx = {
  flexShrink: 0,
  bgcolor: tacticalSurface.card,
  border: `1px solid ${tacticalSurface.border}`,
  borderRadius: 0.5,
  overflow: "hidden",
  cursor: "pointer",
  transition:
    "background-color 140ms ease, border-color 160ms ease, box-shadow 200ms ease",
} as const;

function BucketGrid({
  counts,
  onSelect,
}: {
  counts: Record<LibraryBucket, number>;
  onSelect: (bucket: LibraryBucket) => void;
}) {
  return (
    <Stack
      spacing={1}
      sx={{ ...scrollbarTacticalSx, flex: 1, minHeight: 0, overflowY: "auto", p: 1.5 }}
    >
      {buckets.map((bucket) => {
        const count = counts[bucket.key];
        return (
          <Box
            key={bucket.key}
            onClick={() => onSelect(bucket.key)}
            sx={{
              ...cardOuterSx,
              "&:hover": {
                borderColor: bucket.accent,
                bgcolor: tacticalSurface.cardHover,
                boxShadow: `0 0 0 1px ${bucket.accent}33, 0 8px 22px ${bucket.accent}1a`,
              },
              "&:hover .bucket-chevron": {
                transform: "translateX(3px)",
                color: bucket.accent,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.85,
                px: 1.25,
                py: 0.6,
                bgcolor: tacticalSurface.cardHeader,
                borderBottom: `1px solid ${tacticalSurface.hairline}`,
              }}
            >
              <Box
                sx={{ width: 3, height: 12, bgcolor: bucket.accent, flexShrink: 0 }}
              />
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 10.5,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  color: "text.secondary",
                  flex: 1,
                }}
              >
                {bucket.label.toUpperCase()}
              </Typography>
              <CountChip count={count} accent={bucket.accent} />
            </Box>

            <Box sx={{ p: 1.25 }}>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 0.5,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: `${bucket.accent}1a`,
                    color: bucket.accent,
                    border: `1px solid ${bucket.accent}40`,
                    flexShrink: 0,
                  }}
                >
                  {bucket.icon}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      color: "text.secondary",
                      lineHeight: 1.45,
                    }}
                  >
                    {bucket.description}
                  </Typography>
                </Box>
                <ChevronRightIcon
                  className="bucket-chevron"
                  sx={{
                    fontSize: 19,
                    color: "rgba(255,255,255,0.3)",
                    transition: "transform 140ms ease, color 140ms ease",
                    flexShrink: 0,
                  }}
                />
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

function CategoryList({
  counts,
  accent,
  onSelect,
}: {
  counts: Record<PlanCategory, number>;
  accent: string;
  onSelect: (category: PlanCategory) => void;
}) {
  return (
    <Stack
      spacing={1}
      sx={{ ...scrollbarTacticalSx, flex: 1, minHeight: 0, overflowY: "auto", p: 1.5 }}
    >
      {categories.map((category) => {
        const count = counts[category.key];
        const empty = count === 0;
        return (
          <Box
            key={category.key}
            onClick={empty ? undefined : () => onSelect(category.key)}
            sx={{
              ...cardOuterSx,
              cursor: empty ? "default" : "pointer",
              opacity: empty ? 0.55 : 1,
              "&:hover": !empty
                ? {
                    borderColor: accent,
                    bgcolor: tacticalSurface.cardHover,
                    boxShadow: `0 0 0 1px ${accent}33`,
                  }
                : undefined,
              "&:hover .category-chevron": !empty
                ? { transform: "translateX(3px)", color: accent }
                : undefined,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.85,
                px: 1.25,
                py: 0.6,
                bgcolor: tacticalSurface.cardHeader,
                borderBottom: `1px solid ${tacticalSurface.hairline}`,
              }}
            >
              <Box sx={{ width: 3, height: 12, bgcolor: accent, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 10.5,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  color: "text.secondary",
                  flex: 1,
                }}
              >
                {category.label.toUpperCase()}
              </Typography>
              {empty ? (
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 10.5,
                    letterSpacing: 1.2,
                    fontWeight: 700,
                    color: "text.secondary",
                    px: 0.85,
                    py: 0.25,
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 0.5,
                  }}
                >
                  EMPTY
                </Typography>
              ) : (
                <CountChip count={count} accent={accent} />
              )}
            </Box>

            <Box sx={{ p: 1.25 }}>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 0.5,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "rgba(255,255,255,0.04)",
                    color: empty ? "text.secondary" : accent,
                    border: "1px solid rgba(255,255,255,0.1)",
                    flexShrink: 0,
                  }}
                >
                  {category.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "text.secondary",
                    minWidth: 0,
                    flex: 1,
                    lineHeight: 1.45,
                  }}
                >
                  {category.description}
                </Typography>
                <ChevronRightIcon
                  className="category-chevron"
                  sx={{
                    fontSize: 19,
                    color: empty ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.3)",
                    transition: "transform 140ms ease, color 140ms ease",
                    flexShrink: 0,
                  }}
                />
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

function CrewList({
  crewMembers,
  accent,
  onSelect,
}: {
  crewMembers: Array<{ name: string; count: number }>;
  accent: string;
  onSelect: (crew: string) => void;
}) {
  if (crewMembers.length === 0) {
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
            NO CREW FOLDERS
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Stack
      spacing={0.85}
      sx={{ ...scrollbarTacticalSx, flex: 1, minHeight: 0, overflowY: "auto", p: 1.5 }}
    >
      {crewMembers.map(({ name, count }) => (
        <Box
          key={name}
          onClick={() => onSelect(name)}
          sx={{
            ...cardOuterSx,
            "&:hover": {
              borderColor: accent,
              bgcolor: tacticalSurface.cardHover,
              boxShadow: `0 0 0 1px ${accent}33`,
            },
            "&:hover .crew-chevron": {
              transform: "translateX(3px)",
              color: accent,
            },
          }}
        >
          <Box sx={{ p: 1 }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 0.5,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  bgcolor: `${accent}1c`,
                  color: accent,
                  border: `1px solid ${accent}55`,
                  fontFamily: monoFont,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                {initials(name)}
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: "text.primary",
                  }}
                >
                  {name.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: 10.5,
                    letterSpacing: 1.2,
                    color: "text.secondary",
                    mt: 0.15,
                  }}
                >
                  {count} {count === 1 ? "PLAN" : "PLANS"}
                </Typography>
              </Box>

              <CountChip count={count} accent={accent} />
              <ChevronRightIcon
                className="crew-chevron"
                sx={{
                  fontSize: 19,
                  color: "rgba(255,255,255,0.3)",
                  transition: "transform 140ms ease, color 140ms ease",
                  flexShrink: 0,
                }}
              />
            </Stack>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

function ItemList({
  plans,
  filter,
  pendingPlanIds,
  accent,
  onToggle,
}: {
  plans: WeaponPlan[];
  filter: PlanFilter;
  pendingPlanIds: string[];
  accent: string;
  onToggle: (id: string) => void;
}) {
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
      sx={{ ...scrollbarTacticalSx, flex: 1, minHeight: 0, overflowY: "auto", p: 1.5 }}
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
              bgcolor: selected ? tacticalSurface.cardSelected : tacticalSurface.card,
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
                gap: 0.85,
                px: 1.25,
                py: 0.7,
                bgcolor: tacticalSurface.cardHeader,
                borderBottom: `1px solid ${tacticalSurface.hairline}`,
              }}
            >
              <Box sx={{ width: 3, height: 12, bgcolor: accent, flexShrink: 0 }} />
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
                  border: `1px solid ${plan.isOpen ? "#a5d6a755" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 0.5,
                  bgcolor: plan.isOpen ? "rgba(165,214,167,0.08)" : "transparent",
                  flexShrink: 0,
                }}
              >
                {plan.isOpen ? "OPEN" : "CLOSED"}
              </Typography>
            </Box>

            <Box sx={{ p: 1.25 }}>
              <Stack spacing={0.85}>
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

function FooterBar({
  accent,
  hasSelection,
  count,
  onCancel,
  onConfirm,
}: {
  accent: string;
  hasSelection: boolean;
  count: number;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        position: "relative",
        bgcolor: "#161616",
        borderTop: `1px solid ${tacticalSurface.hairline}`,
        px: 1.5,
        py: 1.25,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1.25}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 0.5,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              bgcolor: hasSelection ? `${accent}1f` : "rgba(255,255,255,0.04)",
              border: `1px solid ${hasSelection ? `${accent}55` : "rgba(255,255,255,0.08)"}`,
              color: hasSelection ? accent : "text.secondary",
              fontFamily: monoFont,
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1,
              transition:
                "background-color 220ms ease, border-color 220ms ease, color 220ms ease",
            }}
          >
            {count}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: 10.5,
                letterSpacing: 1.4,
                fontWeight: 700,
                color: hasSelection ? "text.primary" : "text.secondary",
              }}
              noWrap
            >
              {hasSelection
                ? `PLAN${count === 1 ? "" : "S"} SELECTED`
                : "NOTHING SELECTED"}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
                lineHeight: 1.3,
              }}
              noWrap
            >
              {hasSelection
                ? "Deploy into active workspace"
                : "Tap items to multi-select"}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
          <Button
            size="small"
            onClick={onCancel}
            sx={{
              fontFamily: monoFont,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              height: 32,
              px: 1.25,
              color: "text.secondary",
              borderRadius: 0.5,
              "&:hover": {
                color: "text.primary",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            disabled={!hasSelection}
            onClick={onConfirm}
            sx={{
              fontFamily: monoFont,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              height: 32,
              px: 1.5,
              minWidth: 120,
              bgcolor: accent,
              color: "#0f0f0f",
              borderRadius: 0.5,
              boxShadow: `0 0 0 1px ${accent}99 inset, 0 4px 14px ${accent}26`,
              transition: "background-color 160ms ease, box-shadow 160ms ease, filter 160ms ease",
              "&:hover": {
                bgcolor: accent,
                filter: "brightness(1.1)",
                boxShadow: `0 0 0 1px ${accent} inset, 0 6px 18px ${accent}40`,
              },
              "&:disabled": {
                bgcolor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.3)",
                boxShadow: "none",
              },
            }}
          >
            {count > 1 ? "Open Plans" : "Open Plan"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function FilterButton({
  filter,
  anchorEl,
  onOpen,
  onClose,
  onChange,
}: {
  filter: PlanFilter;
  anchorEl: HTMLElement | null;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onChange: (value: PlanFilter) => void;
}) {
  const labelMap: Record<PlanFilter, string> = {
    all: "ALL",
    open: "OPEN",
    closed: "CLOSED",
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        size="small"
        startIcon={<FilterListIcon sx={{ fontSize: 15 }} />}
        onClick={onOpen}
        sx={{
          fontFamily: monoFont,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.3,
          textTransform: "uppercase",
          height: 26,
          px: 1,
          color: "text.secondary",
          bgcolor: "#242424",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 0.5,
          whiteSpace: "nowrap",
          flexShrink: 0,
          "& .MuiButton-startIcon": { mr: 0.5 },
          "&:hover": {
            bgcolor: "#2c2c2c",
            color: "text.primary",
            borderColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        {labelMap[filter]}
      </Button>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 0.75,
            bgcolor: "#1c1c1c",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 0.5,
            minWidth: 130,
            backgroundImage: "none",
          },
        }}
      >
        {(["all", "open", "closed"] as const).map((value) => (
          <MenuItem
            key={value}
            selected={filter === value}
            onClick={() => onChange(value)}
            sx={{
              fontFamily: monoFont,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 1.3,
              color: "text.secondary",
              "&.Mui-selected": { bgcolor: "#2a2a2a", color: "text.primary" },
              "&.Mui-selected:hover, &:hover": {
                bgcolor: "#262626",
                color: "text.primary",
              },
            }}
          >
            {labelMap[value]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
