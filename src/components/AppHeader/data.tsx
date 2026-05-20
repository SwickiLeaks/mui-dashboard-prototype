import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PublicIcon from "@mui/icons-material/Public";
import TuneIcon from "@mui/icons-material/Tune";

import type { PanelKey } from "../../types";

export type HeaderControl = {
  key: PanelKey;
  label: string;
  icon: React.ReactNode;
};

/** Panel-launcher buttons rendered in the expanded control bar. */
export const controls: HeaderControl[] = [
  { key: "map", label: "Open Plans", icon: <PublicIcon /> },
  { key: "create", label: "Create", icon: <AddIcon /> },
  { key: "library", label: "Library", icon: <BookmarkIcon /> },
  { key: "tools", label: "Tools", icon: <TuneIcon /> },
  { key: "review", label: "Review", icon: <AutoAwesomeIcon /> },
];
