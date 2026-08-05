import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";

import { Banner } from "./Banner";
import { Button } from "./Button";

const meta: Meta<typeof Banner> = {
  title: "Molecules/Banner",
  component: Banner,
  args: { label: "Open Plans", status: "3 Open", statusActive: true },
  argTypes: { statusActive: { control: "boolean" } },
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ background: "#262626" }}>
      <Banner {...args} onClose={() => {}} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack sx={{ background: "#262626" }}>
      <Banner label="Open Plans" status="Standby" statusActive={false} />
      <Banner label="Library" status="Browse" statusActive />
      <Banner
        label="Open Plans"
        status="3 Open"
        statusActive
        rightSlot={
          <Button size="sm" variant="soft" tone="danger" startIcon={<CloseIcon sx={{ fontSize: 13 }} />}>
            Close All
          </Button>
        }
      />
    </Stack>
  ),
};
