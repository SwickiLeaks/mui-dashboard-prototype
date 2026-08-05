import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";

import { Tile } from "./Tile";
import { Text } from "./Text";

const meta: Meta<typeof Tile> = {
  title: "Molecules/Tile",
  component: Tile,
  args: {
    title: "LRASM Weapon Plan 1",
    meta: "Drafted by Garmin · 18 APR 2026",
    active: true,
    selected: true,
  },
  argTypes: { active: { control: "boolean" }, selected: { control: "boolean" } },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof Tile>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 400 }}>
      <Tile {...args}>
        <Text preset="body">
          Selectable tile with the standard header — title, Active pill, and a close button.
        </Text>
      </Tile>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      <Tile title="GBU-X Weapon Plan 1" meta="Drafted by McLovin" active selected onClick={() => {}} onClose={() => {}}>
        <Text preset="body">Selected + active.</Text>
      </Tile>
      <Tile title="GBU-X Weapon Plan 2" meta="Drafted by Yeti" onClick={() => {}} onClose={() => {}}>
        <Text preset="body">Resting tile.</Text>
      </Tile>
    </Stack>
  ),
};
