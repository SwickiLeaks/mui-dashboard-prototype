import { IconButton } from "@mui/material";

import { selectionStyles } from "../../../theme";

type PrimaryIconButtonProps = {
  active?: boolean;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export default function PrimaryIconButton({
  active = false,
  title,
  onClick,
  children,
}: PrimaryIconButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      title={title}
      disableFocusRipple
      sx={{
        flexShrink: 0,
        width: 38,
        height: 38,
        padding: 0,
        boxSizing: "border-box",
        borderRadius: 0.5,
        bgcolor: active ? "#2a2a2a" : "#1a1a1a",
        border: "1px solid",
        borderColor: active ? selectionStyles.border : "#2a2a2a",
        color: active ? "text.primary" : "text.secondary",
        boxShadow: active ? selectionStyles.ring : "none",
        outline: "none",
        transition:
          "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          bgcolor: active ? "#2a2a2a" : "#222",
          color: "text.primary",
          borderColor: active ? selectionStyles.border : "#3a3a3a",
        },
        "&:focus, &.Mui-focusVisible": {
          outline: "none",
          boxShadow: active ? selectionStyles.ring : "none",
        },
      }}
    >
      {children}
    </IconButton>
  );
}
