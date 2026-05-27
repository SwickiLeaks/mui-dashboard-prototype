import { Box, Button, Stack, Typography } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import LaunchIcon from "@mui/icons-material/Launch";
import LinkOffIcon from "@mui/icons-material/LinkOff";

import { monoFont } from "../../../theme";
import { dangerMicroActionSx, microActionSx } from "../styles";

type AssociationRowProps = {
  name: string;
  isOpen: boolean;
  accent: string;
  onOpen: () => void;
  onDisassociate: () => void;
};

export default function AssociationRow({
  name,
  isOpen,
  accent,
  onOpen,
  onDisassociate,
}: AssociationRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        py: 1,
        px: 1.25,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.05)",
        transition: "background-color 140ms ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.09)",
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
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={0.75}
        sx={{ minWidth: 0, flex: 1 }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>
          {name}
        </Typography>
        {isOpen && (
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 0.2,
              color: "#90caf9",
              flexShrink: 0,
            }}
          >
            Open
          </Typography>
        )}
      </Stack>
      <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
        <Button
          size="small"
          startIcon={<LaunchIcon sx={{ fontSize: 12 }} />}
          onClick={onOpen}
          sx={microActionSx}
        >
          Open
        </Button>
        <Button
          size="small"
          startIcon={<LinkOffIcon sx={{ fontSize: 12 }} />}
          onClick={onDisassociate}
          sx={dangerMicroActionSx}
        >
          Disassociate
        </Button>
      </Stack>
    </Box>
  );
}
