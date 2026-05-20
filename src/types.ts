export type PanelKey = "map" | "create" | "library" | "tools" | "review";

export type PlanCategory = "excavation" | "network" | "comm" | "emergency";

export type LibraryBucket = "standards" | "myItems" | "favorites" | "aircrew";

export type TargetPriority = "low" | "med" | "high";
export type ReleaseStatus = "draft" | "approved" | "active";

export type Target = {
  id: string;
  name: string;
  coordinates: string;
  priority: TargetPriority;
  notes: string;
};

export type Release = {
  id: string;
  name: string;
  description: string;
  status: ReleaseStatus;
  targets: Target[];
};

export type ExcavationPlan = {
  id: string;
  name: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
  createdBy: string;
  isOpen: boolean;
  category: PlanCategory;
  isStandard: boolean;
  isMine: boolean;
  isFavorite: boolean;
  associatedPlanIds: string[];
  releases: Release[];
};
