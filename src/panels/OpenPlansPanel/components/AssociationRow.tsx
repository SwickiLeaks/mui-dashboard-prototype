import { Box, Button, Typography } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import LinkOffIcon from "@mui/icons-material/LinkOff";

import { monoFont } from "../../../theme";
import { dangerMicroActionSx } from "../styles";

type AssociationRowProps = {
  name: string;
  accent: string;
  selected: boolean;
  onSelect: () => void;
  onDisassociate: () => void;
};

export default function AssociationRow({
  name,
  accent,
  selected,
  onSelect,
  onDisassociate,
}: AssociationRowProps) {
  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        py: 1,
        px: 1.25,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: selected ? "rgba(144,202,249,0.16)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${
          selected ? "rgba(144,202,249,0.6)" : "transparent"
        }`,
        transition: "background-color 140ms ease, border-color 140ms ease",
        "&:hover": {
          bgcolor: selected
            ? "rgba(144,202,249,0.2)"
            : "rgba(255,255,255,0.09)",
        },
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          bgcolor: `${accent}24`,
          color: accent,
        }}
      >
        <ArticleIcon sx={{ fontSize: 14 }} />
      </Box>
      <Typography
        sx={{ fontSize: 13, fontWeight: 600, minWidth: 0, flex: 1 }}
        noWrap
      >
        {name}
      </Typography>
      {selected && (
        <Box
          sx={{
            px: 0.85,
            py: 0.25,
            borderRadius: "999px",
            fontFamily: monoFont,
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: 0.1,
            color: "#90caf9",
            bgcolor: "rgba(144,202,249,0.16)",
            flexShrink: 0,
          }}
        >
          Active
        </Box>
      )}
      <Button
        size="small"
        startIcon={<LinkOffIcon sx={{ fontSize: 12 }} />}
        onClick={(event) => {
          event.stopPropagation();
          onDisassociate();
        }}
        sx={dangerMicroActionSx}
      >
        Disassociate
      </Button>
    </Box>
  );
}
