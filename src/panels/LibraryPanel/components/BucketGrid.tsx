import { Box, Stack, Typography } from "@mui/material";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { monoFont, scrollbarTacticalSx, tacticalSurface } from "../../../theme";
import type { LibraryBucket } from "../../../types";
import { buckets } from "../data";
import { LIBRARY_ACCENT, cardOuterSx } from "../styles";
import CountChip from "./CountChip";

type BucketGridProps = {
  counts: Record<LibraryBucket, number>;
  onSelect: (bucket: LibraryBucket) => void;
};

export default function BucketGrid({ counts, onSelect }: BucketGridProps) {
  return (
    <Stack
      spacing={1}
      sx={{
        ...scrollbarTacticalSx,
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        p: 2,
      }}
    >
      {buckets.map((bucket) => {
        const count = counts[bucket.key];
        return (
          <Box
            key={bucket.key}
            onClick={() => onSelect(bucket.key)}
            sx={{
              ...cardOuterSx,
              "&:hover": {
                borderColor: LIBRARY_ACCENT,
                bgcolor: tacticalSurface.cardHover,
                boxShadow: `0 0 0 1px ${LIBRARY_ACCENT}33, 0 8px 22px ${LIBRARY_ACCENT}1a`,
              },
              "&:hover .bucket-chevron": {
                transform: "translateX(3px)",
                color: LIBRARY_ACCENT,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.95,
                bgcolor: tacticalSurface.cardHeader,
                borderBottom: `1px solid ${tacticalSurface.hairline}`,
              }}
            >
              <Box
                sx={{
                  width: 3,
                  height: 14,
                  bgcolor: LIBRARY_ACCENT,
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: 10.5,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  color: "text.secondary",
                  flex: 1,
                }}
              >
                {bucket.label.toUpperCase()}
              </Typography>
              <CountChip count={count} accent={LIBRARY_ACCENT} />
            </Box>

            <Box sx={{ p: 1.75 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 0.5,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: `${LIBRARY_ACCENT}1a`,
                    color: LIBRARY_ACCENT,
                    border: `1px solid ${LIBRARY_ACCENT}40`,
                    flexShrink: 0,
                  }}
                >
                  {bucket.icon}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      color: "text.secondary",
                      lineHeight: 1.45,
                    }}
                  >
                    {bucket.description}
                  </Typography>
                </Box>
                <ChevronRightIcon
                  className="bucket-chevron"
                  sx={{
                    fontSize: 19,
                    color: "rgba(255,255,255,0.3)",
                    transition: "transform 140ms ease, color 140ms ease",
                    flexShrink: 0,
                  }}
                />
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
