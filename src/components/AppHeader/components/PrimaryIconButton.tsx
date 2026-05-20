import { IconButton } from "@mui/material";

import { selectionStyles } from "../../../theme";

type PrimaryIconButtonProps = {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function PrimaryIconButton({
  active = false,
  onClick,
  children,
}: PrimaryIconButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: 38,
        height: 38,
        borderRadius: 0.5,
        bgcolor: active ? "#2a2a2a" : "#1a1a1a",
        border: "1px solid",
        borderColor: active ? selectionStyles.border : "#2a2a2a",
        color: active ? "text.primary" : "text.secondary",
        boxShadow: active ? selectionStyles.ring : "none",
        transition:
          "background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease",

        "&:hover": {
          bgcolor: active ? "#2a2a2a" : "#222",
          color: "text.primary",
          borderColor: active ? selectionStyles.border : "#3a3a3a",
          transform: "translateY(-1px)",
        },
      }}
    >
      {children}
    </IconButton>
  );
}
