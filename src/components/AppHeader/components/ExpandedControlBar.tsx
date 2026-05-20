import { Box, Button, Stack } from "@mui/material";

import { monoFont, selectionStyles } from "../../../theme";
import type { PanelKey } from "../../../types";
import { controls } from "../data";

type ExpandedControlBarProps = {
  expanded: boolean;
  selectedPanel: PanelKey | null;
  onSelectedPanelChange: React.Dispatch<React.SetStateAction<PanelKey | null>>;
};

/** The 5 panel-launcher buttons (Open Plans, Create, Library, Tools, Review). */
export default function ExpandedControlBar({
  expanded,
  selectedPanel,
  onSelectedPanelChange,
}: ExpandedControlBarProps) {
  return (
    <Box
      aria-hidden={!expanded}
      sx={{
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        ml: expanded ? 1 : 0,
        maxWidth: expanded ? 800 : 0,
        opacity: expanded ? 1 : 0,
        transform: expanded ? "translateX(0)" : "translateX(-8px)",
        transition:
          "max-width 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 220ms ease, transform 240ms cubic-bezier(0.4, 0, 0.2, 1), margin-left 240ms cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: expanded ? "auto" : "none",
      }}
    >
      <Stack direction="row" spacing={0.75} alignItems="center">
        {controls.map((control) => {
          const selected = selectedPanel === control.key;

          return (
            <Button
              key={control.key}
              startIcon={control.icon}
              onClick={() =>
                onSelectedPanelChange((current) =>
                  current === control.key ? null : control.key
                )
              }
              sx={{
                height: 38,
                borderRadius: 0.5,
                px: 1.25,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                fontFamily: monoFont,
                fontSize: 11.5,
                letterSpacing: 1.4,
                color: selected ? "text.primary" : "text.secondary",
                bgcolor: selected ? "#2a2a2a" : "#1a1a1a",
                border: "1px solid",
                borderColor: selected ? selectionStyles.border : "#2a2a2a",
                boxShadow: selected ? selectionStyles.ring : "none",
                fontWeight: 700,
                transition:
                  "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease",
                "& .MuiButton-startIcon": {
                  mr: 0.75,
                },
                "&:hover": {
                  bgcolor: selected ? "#2a2a2a" : "#222",
                  color: "text.primary",
                  borderColor: selected ? selectionStyles.border : "#3a3a3a",
                },
              }}
            >
              {control.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
