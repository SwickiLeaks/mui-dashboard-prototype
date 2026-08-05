import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Card } from "./Card";
import { Text } from "./Text";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  args: { selected: false },
  argTypes: { selected: { control: "boolean" }, interactive: { control: "boolean" } },
};
export default meta;

type Story = StoryObj<typeof Card>;

const Body = () => (
  <Box sx={{ p: 2 }}>
    <Text preset="title">LRASM Weapon Plan 1</Text>
    <Text preset="body" sx={{ mt: 0.5 }}>
      A base surface card — rest, hover, and selected states over token elevation.
    </Text>
  </Box>
);

export const Playground: Story = {
  args: { onClick: () => {}, children: <Body />, sx: { width: 360 } },
};

export const RestVsSelected: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 360 }}>
      <Card onClick={() => {}}><Body /></Card>
      <Card selected onClick={() => {}}><Body /></Card>
    </Stack>
  ),
};
