import type { Meta, StoryObj } from "@storybook/react";
import Stack from "@mui/material/Stack";
import FolderIcon from "@mui/icons-material/Folder";
import BuildIcon from "@mui/icons-material/Build";
import PublicIcon from "@mui/icons-material/Public";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  argTypes: {
    variant: { control: "inline-radio", options: ["plain", "selectable"] },
    shape: { control: "inline-radio", options: ["rounded", "circle"] },
    tone: { control: "inline-radio", options: ["neutral", "danger"] },
    active: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: { variant: "selectable", active: true, children: <FolderIcon fontSize="small" /> },
};

export const Rail: Story = {
  name: "Selectable rail",
  render: () => (
    <Stack direction="row" spacing={1}>
      <IconButton variant="selectable" active>
        <FolderIcon fontSize="small" />
      </IconButton>
      <IconButton variant="selectable">
        <PublicIcon fontSize="small" />
      </IconButton>
      <IconButton variant="selectable">
        <BuildIcon fontSize="small" />
      </IconButton>
    </Stack>
  ),
};

export const Close: Story = {
  name: "Circular close (danger hover)",
  render: () => (
    <IconButton shape="circle" tone="danger" size={30} title="Close">
      <CloseIcon sx={{ fontSize: 15 }} />
    </IconButton>
  ),
};
