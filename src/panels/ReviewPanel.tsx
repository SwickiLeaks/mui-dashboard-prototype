import { Box, Stack, Typography } from "@mui/material";

import TaskAltIcon from "@mui/icons-material/TaskAlt";

import PanelHeader from "../components/PanelHeader";
import PanelActions from "../components/PanelActions";
import {
  TacticalSection,
  monoFont,
  scrollbarTacticalSx,
} from "../theme";

type ReviewPanelProps = {
  onClose: () => void;
};

const ACCENT = "#ce93d8";

export default function ReviewPanel({ onClose }: ReviewPanelProps) {
  return (
    <>
      <PanelHeader
        title="Review"
        description="Final pass before publishing changes to the workspace."
        accent={ACCENT}
        activeStep={2}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 1.5,
          ...scrollbarTacticalSx,
        }}
      >
        <Stack spacing={1.25}>
          <TacticalSection
            label="SUMMARY"
            icon={TaskAltIcon}
            accent={ACCENT}
          >
            <Typography
              sx={{ color: "text.secondary", fontSize: 13.5, lineHeight: 1.6 }}
            >
              Everything is ready to review before continuing. Confirm to publish
              the staged changes to the active workspace.
            </Typography>
          </TacticalSection>

          <TacticalSection label="CHECKLIST" accent={ACCENT}>
            <Stack spacing={0.65}>
              {[
                ["TITLE", "DEFINED"],
                ["DESCRIPTION", "DEFINED"],
                ["CLASSIFICATION", "DRAFT"],
              ].map(([label, value]) => (
                <Stack
                  key={label}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  spacing={1.5}
                >
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: 11,
                      letterSpacing: 1.2,
                      fontWeight: 700,
                      color: "text.secondary",
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: value === "DEFINED" ? "#a5d6a7" : "text.secondary",
                    }}
                  >
                    {value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </TacticalSection>
        </Stack>
      </Box>

      <PanelActions accent={ACCENT} onClose={onClose} continueLabel="Publish" />
    </>
  );
}
