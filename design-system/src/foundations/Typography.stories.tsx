import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@mui/material";

import { Text, type TextPreset } from "../components/Text";
import { Spec } from "./tokenTable";

const meta: Meta = { title: "Foundations/Typography", parameters: { layout: "padded" } };
export default meta;

const PRESETS: Array<[TextPreset, string]> = [
  ["title", "17 / 700"],
  ["bannerLabel", "16 / 700 / +0.4"],
  ["sectionLabel", "13.5 / 700 / +0.2"],
  ["dataLabel", "11 / 700 / +1.2"],
  ["dataValue", "12 / 600"],
  ["meta", "12 / 500"],
  ["body", "13.5 / 400"],
];

export const TypeScale: StoryObj = {
  render: () => (
    <Stack spacing={2.5}>
      {PRESETS.map(([preset, spec]) => (
        <Spec key={preset} label={`${preset} · ${spec}`}>
          <Text preset={preset}>The quick brown fox jumps over the lazy dog</Text>
        </Spec>
      ))}
    </Stack>
  ),
};
