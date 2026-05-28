import { useMemo, useState } from "react";
import { Box, Breadcrumbs } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { ClassificationBanner, appAccent, tacticalSurface } from "../../theme";
import type { LibraryBucket, PlanCategory, WeaponPlan } from "../../types";

import BreadcrumbSegment from "./components/BreadcrumbSegment";
import BucketGrid from "./components/BucketGrid";
import CategoryList from "./components/CategoryList";
import CrewList from "./components/CrewList";
import FilterButton from "./components/FilterButton";
import FooterBar from "./components/FooterBar";
import ItemList from "./components/ItemList";
import { buckets, categories } from "./data";
import type { LibraryPath, PlanFilter } from "./types";
import { getView, scopeForPath } from "./utils";

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

  const pathKey = [
    path.bucket ?? "root",
    path.crew ?? "",
    path.category ?? "",
  ].join("|");
  const bucketIsCurrent =
    path.bucket === "aircrew" ? view === "crew" : view === "categories";

  const statusLabel = (() => {
    if (view === "root") return "Browse";
    if (view === "categories") return bucketMeta?.label ?? "";
    if (view === "crew") return "Aircrew";
    return categoryMeta?.label ?? "";
  })();

  return (
    <>
      <ClassificationBanner
        accent={appAccent}
        label="Library"
        status={statusLabel}
      />

      <Box
        sx={{
          px: 2,
          py: 1.25,
          bgcolor: "transparent",
          borderBottom: `1px solid ${tacticalSurface.hairline}`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.25,
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
            label="Library"
            isCurrent={view === "root"}
            onClick={view === "root" ? undefined : goRoot}
          />
          {path.bucket && bucketMeta && (
            <BreadcrumbSegment
              label={bucketMeta.label}
              isCurrent={bucketIsCurrent}
              onClick={bucketIsCurrent ? undefined : goBucket}
            />
          )}
          {path.crew && (
            <BreadcrumbSegment
              label={path.crew}
              isCurrent={view === "categories"}
              onClick={view === "categories" ? undefined : goCrew}
            />
          )}
          {path.category && categoryMeta && (
            <BreadcrumbSegment label={categoryMeta.label} isCurrent />
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
          <CategoryList counts={categoryCounts} onSelect={enterCategory} />
        )}
        {view === "crew" && (
          <CrewList crewMembers={crewMembers} onSelect={enterCrew} />
        )}
        {view === "items" && (
          <ItemList
            plans={items}
            filter={filter}
            pendingPlanIds={pendingPlanIds}
            onToggle={togglePlan}
          />
        )}
      </Box>

      {view === "items" && (
        <FooterBar
          accent={appAccent}
          hasSelection={hasSelection}
          count={pendingPlans.length}
          onCancel={onClose}
          onConfirm={() => onOpenPlans(pendingPlans.map((p) => p.id))}
        />
      )}
    </>
  );
}
