import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Card, type CardProps } from "./Card";
import { IconButton } from "./IconButton";
import { Pill } from "./Pill";
import { Text } from "./Text";

export type TileProps = Omit<CardProps, "title"> & {
  title: React.ReactNode;
  /** Optional secondary meta line under the title. */
  meta?: React.ReactNode;
  /** Shows an "Active" pill in the header when true. */
  active?: boolean;
  /** Renders a circular close button; omit to hide. */
  onClose?: () => void;
  children?: React.ReactNode;
};

/**
 * Selectable content tile: a `Card` with the standard header the app repeats —
 * title + optional Active pill + optional close — over a free-form body.
 */
export function Tile({
  title,
  meta,
  active = false,
  onClose,
  children,
  selected,
  ...rest
}: TileProps) {
  return (
    <Card selected={selected} {...rest}>
      <Box sx={{ p: 2.25 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Text preset="title" noWrap sx={{ minWidth: 0, flex: 1 }}>
              {title}
            </Text>
            {active && <Pill tone="accent">Active</Pill>}
            {onClose && (
              <IconButton
                shape="circle"
                tone="danger"
                size={30}
                title="Close"
                onClick={(event) => {
                  event.stopPropagation();
                  onClose();
                }}
              >
                <CloseIcon sx={{ fontSize: 15 }} />
              </IconButton>
            )}
          </Stack>
          {meta && <Text preset="meta">{meta}</Text>}
          {children}
        </Stack>
      </Box>
    </Card>
  );
}
