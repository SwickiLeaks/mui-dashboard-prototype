import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@mui/material";

import { color, tacticalDarkSemantic as s } from "../tokens";
import { SwatchGroup } from "./tokenTable";

/**
 * FOUNDATIONS — Color.
 *
 * Primitives are the raw ramp; components consume the *semantic* roles below.
 * Swapping the semantic map is what reskins the whole system.
 */
const meta: Meta = { title: "Foundations/Colors", parameters: { layout: "padded" } };
export default meta;

export const Semantic: StoryObj = {
  render: () => (
    <Stack spacing={4}>
      <SwatchGroup
        title="Surface"
        entries={Object.entries(s.surface) as Array<[string, string]>}
      />
      <SwatchGroup title="Text" entries={Object.entries(s.text) as Array<[string, string]>} />
      <SwatchGroup title="Border" entries={Object.entries(s.border) as Array<[string, string]>} />
      <SwatchGroup title="Accent" entries={Object.entries(s.accent) as Array<[string, string]>} />
      <SwatchGroup title="Feedback" entries={Object.entries(s.feedback) as Array<[string, string]>} />
    </Stack>
  ),
};

export const Primitives: StoryObj = {
  render: () => (
    <Stack spacing={4}>
      <SwatchGroup title="Ink ramp" entries={Object.entries(color.ink) as Array<[string, string]>} />
      <SwatchGroup
        title="Named"
        entries={[
          ["accent", color.accent.main],
          ["selectedSurface", color.selectedSurface],
          ["danger", color.danger],
        ]}
      />
    </Stack>
  ),
};
