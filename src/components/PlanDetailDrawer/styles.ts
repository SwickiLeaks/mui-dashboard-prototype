import type { PlanCategory } from "../../types";

/** Accent color shown on the banner / accent stripes per plan category. */
export const categoryColor: Record<PlanCategory, string> = {
  weapon: "#ce93d8",
  network: "#a5d6a7",
  comm: "#ffcc80",
  e2: "#ef9a9a",
};

/** Amber/yellow used on the missing-coordinates warning indicator. */
export const WARNING_COLOR = "#ffb74d";
