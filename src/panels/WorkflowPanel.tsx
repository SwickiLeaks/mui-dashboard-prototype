import { Box } from "@mui/material";

import { ClassificationBanner, appAccent, scrollbarTacticalSx } from "../theme";

type WorkflowPanelProps = {
  onClose: () => void;
};

export default function WorkflowPanel({ onClose }: WorkflowPanelProps) {
  return (
    <>
      <ClassificationBanner
        accent={appAccent}
        label="Workflow"
        status="Process"
        onClose={onClose}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 2,
          ...scrollbarTacticalSx,
        }}
      >
        {/* Drop the workflow component here. */}
        <Box sx={{ width: "100%", height: "100%" }} />
      </Box>
    </>
  );
}
