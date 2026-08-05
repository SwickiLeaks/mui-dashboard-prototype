import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";

import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  args: { preset: "body", children: "The quick brown fox jumps over the lazy dog." },
  argTypes: {
    preset: {
      control: "select",
      options: ["title", "bannerLabel", "sectionLabel", "dataLabel", "dataValue", "meta", "body"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Playground: Story = {};

export const Scale: Story = {
  render: () => (
    <Stack spacing={1.25}>
      <Text preset="title">Title · 17 / 700</Text>
      <Text preset="bannerLabel">Banner Label · 16 / 700</Text>
      <Text preset="sectionLabel">Section Label · 13.5 / 700</Text>
      <Text preset="dataLabel">DATA LABEL · 11 / 700 / +1.2</Text>
      <Text preset="dataValue">Data value · 12 / 600</Text>
      <Text preset="meta">Meta · 12 / 500</Text>
      <Text preset="body">Body · 13.5 / 400 — comfortable reading size for descriptions.</Text>
    </Stack>
  ),
};
