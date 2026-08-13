import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack } from "@mui/material";

import { breakpoints, contentMaxWidth, gridColumns, gutter, margin } from "../tokens";
import { Container, Grid, GridItem } from "../layout";
import { Text } from "../components/Text";

/**
 * FOUNDATIONS — Layout.
 *
 * The responsive model: 12 columns at every breakpoint, token gutters (16 → 24),
 * outer margins (16 / 24 / 32), capped at 1440px. Resize the canvas (or use the
 * viewport toolbar) to watch spans reflow.
 */
const meta: Meta = { title: "Foundations/Layout", parameters: { layout: "fullscreen" } };
export default meta;

function Cell({ children, tall = false }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <Box
      sx={(theme) => ({
        height: tall ? 120 : 56,
        borderRadius: "10px",
        display: "grid",
        placeItems: "center",
        bgcolor: theme.system.accent.soft,
        border: `1px solid ${theme.system.border.selected}`,
        color: theme.system.accent.main,
        fontWeight: 700,
        fontSize: 13,
      })}
    >
      {children}
    </Box>
  );
}

/** The proposed model as a table. */
export const Model: StoryObj = {
  render: () => {
    const rows: Array<[string, string]> = [
      ["Breakpoints", Object.entries(breakpoints).map(([k, v]) => `${k}:${v}`).join("  ")],
      ["Columns", `${gridColumns} (all breakpoints)`],
      ["Gutter", `${gutter.xs}px mobile → ${gutter.md}px tablet+`],
      ["Outer margin", `${margin.xs} / ${margin.sm} / ${margin.lg} px`],
      ["Max content width", `${contentMaxWidth}px, centered`],
    ];
    return (
      <Container sx={{ py: 4 }}>
        <Stack spacing={1.5} sx={{ maxWidth: 640 }}>
          {rows.map(([label, value]) => (
            <Stack
              key={label}
              direction="row"
              sx={(theme) => ({ py: 1, borderTop: `1px solid ${theme.system.border.hairline}` })}
            >
              <Text preset="dataLabel" sx={{ width: 180 }}>{label}</Text>
              <Text preset="dataValue" sx={{ flex: 1 }}>{value}</Text>
            </Stack>
          ))}
        </Stack>
      </Container>
    );
  },
};

export const Columns: StoryObj = {
  render: () => (
    <Container sx={{ py: 4 }}>
      <Text preset="sectionLabel" sx={{ mb: 2, display: "block" }}>
        12 columns · each cell spans 4 → three across
      </Text>
      <Grid>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridItem key={i} span={4}>
            <Cell>Cell {i + 1}</Cell>
          </GridItem>
        ))}
      </Grid>
    </Container>
  ),
};

export const Responsive: StoryObj = {
  render: () => (
    <Container sx={{ py: 4 }}>
      <Text preset="sectionLabel" sx={{ mb: 2, display: "block" }}>
        span={"{ xs: 12, md: 6, lg: 4 }"} · full-width → half → third
      </Text>
      <Grid>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridItem key={i} span={{ xs: 12, md: 6, lg: 4 }}>
            <Cell>Item {i + 1}</Cell>
          </GridItem>
        ))}
      </Grid>
    </Container>
  ),
};

export const Nested: StoryObj = {
  render: () => (
    <Container sx={{ py: 4 }}>
      <Text preset="sectionLabel" sx={{ mb: 2, display: "block" }}>
        A grid item can hold its own grid — spans are relative to that row.
      </Text>
      <Grid>
        <GridItem span={{ xs: 12, lg: 8 }}>
          <Box sx={(theme) => ({ p: 2, borderRadius: "12px", bgcolor: theme.system.surface.card })}>
            <Text preset="meta" sx={{ mb: 1.5, display: "block" }}>Parent item (span 8)</Text>
            <Grid>
              {Array.from({ length: 4 }).map((_, i) => (
                <GridItem key={i} span={{ xs: 6 }}>
                  <Cell>Sub {i + 1}</Cell>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </GridItem>
        <GridItem span={{ xs: 12, lg: 4 }}>
          <Cell tall>Sidebar (span 4)</Cell>
        </GridItem>
      </Grid>
    </Container>
  ),
};
