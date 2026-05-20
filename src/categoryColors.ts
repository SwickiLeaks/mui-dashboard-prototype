import type { PlanCategory } from "./types";

/**
 * Accent color per plan category. Shared by the right-side drawer (banner /
 * section accents) and the left-side plan tiles (header stripes, association
 * icons). Keep these in sync so a plan's color signature carries across panes.
 */
export const categoryColor: Record<PlanCategory, string> = {
  weapon: "#90caf9", // blue
  network: "#a5d6a7", // green
  comm: "#ffcc80", // amber
  e2: "#ef9a9a", // red
};
