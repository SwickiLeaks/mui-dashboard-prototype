import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BoltIcon from "@mui/icons-material/Bolt";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import RouterIcon from "@mui/icons-material/Router";
import ShieldIcon from "@mui/icons-material/Shield";
import StarIcon from "@mui/icons-material/Star";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

import type { BucketMeta, CategoryMeta } from "./types";

export const buckets: BucketMeta[] = [
  {
    key: "standards",
    label: "Squadron Standards",
    description: "Approved templates released by the squadron.",
    icon: <ShieldIcon />,
    accent: "#90caf9",
  },
  {
    key: "myItems",
    label: "My Items",
    description: "Plans you've authored or own.",
    icon: <PersonIcon />,
    accent: "#a5d6a7",
  },
  {
    key: "favorites",
    label: "My Favorites",
    description: "Bookmarked for quick access.",
    icon: <StarIcon />,
    accent: "#ffcc80",
  },
  {
    key: "aircrew",
    label: "Aircrew Folders",
    description: "Plans grouped by crew member.",
    icon: <GroupsIcon />,
    accent: "#ce93d8",
  },
];

export const categories: CategoryMeta[] = [
  {
    key: "weapon",
    label: "Weapon Plans Library",
    description: "LRASM and GBU-X strike packages and engagement profiles.",
    icon: <TrackChangesIcon />,
  },
  {
    key: "network",
    label: "Network Plans Library",
    description: "Tactical data link routing and topology layouts.",
    icon: <AccountTreeIcon />,
  },
  {
    key: "comm",
    label: "Comms Plan Library",
    description: "Radio assignments and weapon comms coordination.",
    icon: <RouterIcon />,
  },
  {
    key: "e2",
    label: "E2 Link 16 Event Library",
    description: "E-2 Hawkeye Link 16 events and track-sharing plans.",
    icon: <BoltIcon />,
  },
];
