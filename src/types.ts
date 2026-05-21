export type PanelKey = "map" | "create" | "library" | "tools" | "transfer";

export type PlanCategory = "weapon" | "network" | "comm" | "e2";

export type LibraryBucket = "standards" | "myItems" | "favorites" | "aircrew";

export type Weapon = {
  id: string;
  name: string;
  description: string;
};

export type Target = {
  id: string;
  name: string;
  weaponIds: string[];
  latitude?: number;
  longitude?: number;
};

export type Release = {
  id: string;
  name: string;
  targetIds: string[];
  latitude?: number;
  longitude?: number;
  selected?: boolean;
  hovered?: boolean;
  modified?: boolean;
};

export type WeaponPlan = {
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
  targets: Target[];
  weapons: Weapon[];
};
