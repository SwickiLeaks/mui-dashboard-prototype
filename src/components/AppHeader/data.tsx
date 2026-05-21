import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PublicIcon from "@mui/icons-material/Public";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import type { PanelKey } from "../../types";

export type HeaderControl = {
  key: PanelKey;
  label: string;
  icon: React.ReactNode;
};

/**
 * Panel-launcher buttons rendered in the expanded control bar. `tools` is
 * intentionally not in this list — it's promoted to an always-visible
 * top-level button in the header's right cluster.
 */
export const controls: HeaderControl[] = [
  { key: "map", label: "Open Plans", icon: <PublicIcon /> },
  { key: "create", label: "Create", icon: <AddIcon /> },
  { key: "library", label: "Library", icon: <BookmarkIcon /> },
  { key: "transfer", label: "Transfer", icon: <SwapHorizIcon /> },
];
