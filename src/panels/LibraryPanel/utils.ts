import type { WeaponPlan } from "../../types";
import type { LibraryPath, View } from "./types";

/** Plans matching the current path's bucket / crew constraint (no category
 * filter applied — that happens at the items step). */
export const scopeForPath = (
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

/** Which view (root / categories / crew / items) the current path lands on. */
export const getView = (path: LibraryPath): View => {
  if (!path.bucket) return "root";
  if (path.bucket === "aircrew" && !path.crew) return "crew";
  if (!path.category) return "categories";
  return "items";
};

/** Two-letter initials for the crew avatar tile. */
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((segment) => segment[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
