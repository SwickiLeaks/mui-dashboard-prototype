import { Box, Stack, Typography } from "@mui/material";

import { monoFont } from "../../../theme";
import type { Release, Target } from "../../../types";
import type { Selection } from "../types";
import ReleaseRow from "./ReleaseRow";
import TargetRow from "./TargetRow";

type PlanOverviewTreeProps = {
  releases: Release[];
  targetById: Map<string, Target>;
  expanded: Set<string>;
  selection: Selection | null;
  accent: string;
  onToggle: (releaseId: string) => void;
  onSelect: (next: Selection) => void;
};

export default function PlanOverviewTree({
  releases,
  targetById,
  expanded,
  selection,
  accent,
  onToggle,
  onSelect,
}: PlanOverviewTreeProps) {
  if (releases.length === 0) {
    return (
      <Typography
        sx={{
          fontFamily: monoFont,
          fontSize: 11,
          letterSpacing: 1.2,
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        NO RELEASES DEFINED
      </Typography>
    );
  }

  return (
    <Stack spacing={0.75}>
      {releases.map((release, idx) => {
        const isExpanded = expanded.has(release.id);
        const isReleaseSelected =
          selection?.kind === "release" && selection.releaseId === release.id;
        const releaseTargets = release.targetIds
          .map((id) => targetById.get(id))
          .filter((t): t is Target => Boolean(t));
        return (
          <Box key={release.id}>
            <ReleaseRow
              release={release}
              index={idx}
              targetCount={releaseTargets.length}
              expanded={isExpanded}
              selected={isReleaseSelected}
              accent={accent}
              onToggle={() => onToggle(release.id)}
              onSelect={() =>
                onSelect({ kind: "release", releaseId: release.id })
              }
            />
            {isExpanded && (
              <Box
                sx={{
                  mt: 0.75,
                  ml: 2,
                  pl: 1.5,
                  borderLeft: "1px dashed rgba(255,255,255,0.1)",
                }}
              >
                {releaseTargets.length === 0 ? (
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontSize: 10,
                      letterSpacing: 1.2,
                      color: "text.secondary",
                      fontStyle: "italic",
                      py: 0.5,
                    }}
                  >
                    NO TARGETS
                  </Typography>
                ) : (
                  <Stack spacing={0.5}>
                    {releaseTargets.map((target, tIdx) => {
                      const isTargetSelected =
                        selection?.kind === "target" &&
                        selection.targetId === target.id;
                      return (
                        <TargetRow
                          key={target.id}
                          target={target}
                          index={tIdx}
                          selected={isTargetSelected}
                          accent={accent}
                          onSelect={() =>
                            onSelect({
                              kind: "target",
                              targetId: target.id,
                            })
                          }
                        />
                      );
                    })}
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
