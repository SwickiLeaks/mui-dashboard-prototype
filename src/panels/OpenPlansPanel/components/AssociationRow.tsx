import { Box, Button, Stack, Typography } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import LaunchIcon from "@mui/icons-material/Launch";
import LinkOffIcon from "@mui/icons-material/LinkOff";

import { monoFont } from "../../../theme";
import { dangerMicroActionSx, microActionSx } from "../styles";

type AssociationRowProps = {
  name: string;
  isOpen: boolean;
  onOpen: () => void;
  onUnlink: () => void;
};

export default function AssociationRow({
  name,
  isOpen,
  onOpen,
  onUnlink,
}: AssociationRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        py: 0.85,
        px: 1.1,
        borderRadius: 0.5,
        bgcolor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "background-color 140ms ease, border-color 140ms ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.14)",
        },
      }}
    >
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: 0.5,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          bgcolor: "rgba(144,202,249,0.08)",
          color: "#90caf9",
          border: "1px solid rgba(144,202,249,0.22)",
        }}
      >
        <ArticleIcon sx={{ fontSize: 13 }} />
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
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.4,
              color: "#a5d6a7",
              flexShrink: 0,
            }}
          >
            ACTIVE
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
          onClick={onUnlink}
          sx={dangerMicroActionSx}
        >
          Unlink
        </Button>
      </Stack>
    </Box>
  );
}
