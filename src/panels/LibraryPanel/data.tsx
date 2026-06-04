import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BoltIcon from "@mui/icons-material/Bolt";
import CategoryIcon from "@mui/icons-material/Category";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import RouterIcon from "@mui/icons-material/Router";
import ShieldIcon from "@mui/icons-material/Shield";
import StarIcon from "@mui/icons-material/Star";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

import type { BucketMeta, CategoryMeta } from "./types";

/** Top-level designation buckets shown at the root of the library. */
export const buckets: BucketMeta[] = [
  {
    key: "standards",
    label: "Squadron Standards",
    description: "Approved templates released by the squadron.",
    icon: <ShieldIcon />,
  },
  {
    key: "myItems",
    label: "My Items",
    description: "Plans you've authored or own.",
    icon: <PersonIcon />,
  },
  {
    key: "favorites",
    label: "My Favorites",
    description: "Bookmarked for quick access.",
    icon: <StarIcon />,
  },
  {
    key: "aircrew",
    label: "Aircrew Folders",
    description: "Plans grouped by crew member.",
    icon: <GroupsIcon />,
  },
];

/** Plan-category cards shown one level into a bucket (or crew folder). */
export const categories: CategoryMeta[] = [
  {
    key: "weapon",
    label: "Weapon Plans Library",
    description: "Catalog of Weapon Plans",
    icon: <TrackChangesIcon />,
  },
  {
    key: "network",
    label: "Network Plans Library",
    description: "Network Plans Library",
    icon: <AccountTreeIcon />,
  },
  {
    key: "comm",
    label: "Comms Plan Library",
    description: "Comms Plan Library",
    icon: <RouterIcon />,
  },
  {
    key: "e2",
    label: "E2 Link 16 Event Library",
    description: "E-2 Link 16 Events Library",
    icon: <BoltIcon />,
  },
  {
    key: "shapeCollection",
    label: "Shape Collections Library",
    description: "Catalog of Shape Collections",
    icon: <CategoryIcon />,
  },
];
