import type { LibraryBucket, PlanCategory } from "../../types";

export type PlanFilter = "all" | "open" | "closed";

export type LibraryPath = {
  bucket?: LibraryBucket;
  crew?: string;
  category?: PlanCategory;
};

export type View = "root" | "categories" | "crew" | "items";

export type BucketMeta = {
  key: LibraryBucket;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
};

export type CategoryMeta = {
  key: PlanCategory;
  label: string;
  description: string;
  icon: React.ReactNode;
};
