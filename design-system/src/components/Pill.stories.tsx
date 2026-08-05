import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";

import { Pill } from "./Pill";

const meta: Meta<typeof Pill> = {
  title: "Atoms/Pill",
  component: Pill,
  args: { children: "Active", tone: "accent", variant: "soft", size: "md" },
  argTypes: {
    tone: { control: "inline-radio", options: ["accent", "neutral", "danger"] },
    variant: { control: "inline-radio", options: ["soft", "outline"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;

type Story = StoryObj<typeof Pill>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <Stack spacing={1.5}>
      {(["soft", "outline"] as const).map((variant) => (
        <Stack key={variant} direction="row" spacing={1} alignItems="center">
          <Pill variant={variant} tone="accent">Active</Pill>
          <Pill variant={variant} tone="neutral">Open</Pill>
          <Pill variant={variant} tone="danger">Blocked</Pill>
        </Stack>
      ))}
    </Stack>
  ),
};
