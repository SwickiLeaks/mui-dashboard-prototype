import { Box } from "@mui/material";

import { monoFont } from "../../../theme";

type UserAvatarProps = {
  initials?: string;
  onClick?: () => void;
};

/**
 * Top-right identity/preferences avatar. Placeholder click target for now —
 * future home of a profile / sign-out / preferences menu.
 */
export default function UserAvatar({
  initials = "DS",
  onClick,
}: UserAvatarProps) {
  return (
    <Box
      onClick={onClick}
      title="Account & preferences"
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        userSelect: "none",
        bgcolor: "#1f1f1f",
        border: "1px solid #3a3a3a",
        color: "text.primary",
        fontFamily: monoFont,
        fontSize: 12.5,
        fontWeight: 700,
        letterSpacing: 0.5,
        transition:
          "background-color 160ms ease, border-color 160ms ease",
        "&:hover": {
          bgcolor: "#2a2a2a",
          borderColor: "rgba(255,255,255,0.35)",
        },
      }}
    >
      {initials}
    </Box>
  );
}
