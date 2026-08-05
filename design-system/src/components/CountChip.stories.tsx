import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";

import { CountChip } from "./CountChip";

const meta: Meta<typeof CountChip> = {
  title: "Atoms/CountChip",
  component: CountChip,
  args: { count: 3, dimWhenEmpty: true },
};
export default meta;

type Story = StoryObj<typeof CountChip>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <CountChip count={5} />
      <CountChip count={12} label="Open" />
      <CountChip count={0} />
    </Stack>
  ),
};
