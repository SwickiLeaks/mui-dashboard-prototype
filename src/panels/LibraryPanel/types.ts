import type { LibraryBucket, PlanCategory } from "../../types";

/** Open / closed visibility filter shown on the items view. */
export type PlanFilter = "all" | "open" | "closed";

/** Current position in the library drilldown. Each level is a fetch boundary
 * once plans move to network-loaded. */
export type LibraryPath = {
  bucket?: LibraryBucket;
  crew?: string;
  category?: PlanCategory;
};

/** Which screen the current path resolves to. */
export type View = "root" | "categories" | "crew" | "items";

export type BucketMeta = {
  key: LibraryBucket;
  label: string;
  description: string;
  icon: React.ReactNode;
};

export type CategoryMeta = {
  key: PlanCategory;
  label: string;
  description: string;
  icon: React.ReactNode;
};
