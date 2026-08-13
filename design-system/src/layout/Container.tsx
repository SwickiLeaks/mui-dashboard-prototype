import { Box, type BoxProps } from "@mui/material";

import { contentMaxWidth, margin } from "../tokens";

export type ContainerProps = {
  children?: React.ReactNode;
  /** Escape hatch for one-off style overrides. */
  sx?: BoxProps["sx"];
};

/**
 * The page frame: centers content, caps it at the max content width, and applies
 * the responsive outer margins (16 / 24 / 32). App screens live inside a
 * Container; a Grid usually goes directly inside it.
 */
export function Container({ children, sx }: ContainerProps) {
  return (
    <Box
      sx={[
        {
          width: "100%",
          maxWidth: contentMaxWidth,
          mx: "auto",
          boxSizing: "border-box",
          px: {
            xs: `${margin.xs}px`,
            sm: `${margin.sm}px`,
            lg: `${margin.lg}px`,
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  );
}
