import { Box } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import PublicIcon from "@mui/icons-material/Public";

import PrimaryIconButton from "./PrimaryIconButton";

type CollapsedControlBarProps = {
  expanded: boolean;
};

/** Three quick-icons shown when the panel launcher bar is collapsed. */
export default function CollapsedControlBar({
  expanded,
}: CollapsedControlBarProps) {
  return (
    <Box
      aria-hidden={expanded}
      sx={{
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        maxWidth: expanded ? 0 : 200,
        opacity: expanded ? 0 : 1,
        transform: expanded ? "translateX(-8px)" : "translateX(0)",
        transition:
          "max-width 260ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease, transform 240ms cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: expanded ? "none" : "auto",
        "& > * + *": { ml: 1 },
      }}
    >
      <PrimaryIconButton>
        <AssignmentIcon fontSize="small" />
      </PrimaryIconButton>
      <PrimaryIconButton>
        <PublicIcon fontSize="small" />
      </PrimaryIconButton>
      <PrimaryIconButton>
        <BuildIcon fontSize="small" />
      </PrimaryIconButton>
    </Box>
  );
}
