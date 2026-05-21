import { appAccent } from "./theme";
import type { PlanCategory } from "./types";

/**
 * Per-category accents are intentionally collapsed to a single neutral chrome
 * color so the UI doesn't surface plan-category as a visual dimension. Plan
 * identity is carried by the plan name; stripes are kept as a layout anchor.
 */
export const categoryColor: Record<PlanCategory, string> = {
  weapon: appAccent,
  network: appAccent,
  comm: appAccent,
  e2: appAccent,
};
