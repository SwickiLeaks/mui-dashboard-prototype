import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArticleIcon from "@mui/icons-material/Article";
import ShieldIcon from "@mui/icons-material/Shield";

import { IconChip } from "./IconChip";

const meta: Meta<typeof IconChip> = {
  title: "Atoms/IconChip",
  component: IconChip,
  args: { size: 38, muted: false },
};
export default meta;

type Story = StoryObj<typeof IconChip>;

export const Playground: Story = {
  args: { children: <ArticleIcon sx={{ fontSize: 18 }} /> },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconChip size={28}><ArticleIcon sx={{ fontSize: 14 }} /></IconChip>
      <IconChip size={38}><UploadFileIcon sx={{ fontSize: 18 }} /></IconChip>
      <IconChip size={40}>MK</IconChip>
      <IconChip size={72}><ShieldIcon sx={{ fontSize: 30 }} /></IconChip>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconChip><ArticleIcon sx={{ fontSize: 18 }} /></IconChip>
      <IconChip muted><ShieldIcon sx={{ fontSize: 18 }} /></IconChip>
    </Stack>
  ),
};
