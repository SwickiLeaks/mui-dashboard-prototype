import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "Deploy", variant: "soft", tone: "neutral", size: "md" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "soft", "outline", "ghost"] },
    tone: { control: "inline-radio", options: ["neutral", "accent", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      {(["solid", "soft", "outline", "ghost"] as const).map((variant) => (
        <Stack key={variant} direction="row" spacing={1.5} alignItems="center">
          {(["neutral", "accent", "danger"] as const).map((tone) => (
            <Button key={tone} variant={variant} tone={tone}>
              {variant}/{tone}
            </Button>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" spacing={1.5}>
      <Button variant="solid" tone="accent" startIcon={<AddIcon sx={{ fontSize: 16 }} />}>
        Open Library
      </Button>
      <Button variant="soft" tone="danger" size="sm" startIcon={<CloseIcon sx={{ fontSize: 13 }} />}>
        Close All
      </Button>
    </Stack>
  ),
};
