import { Box, Stack, Typography } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TableChartIcon from "@mui/icons-material/TableChart";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import {
  ClassificationBanner,
  TacticalSection,
  appAccent,
  monoFont,
  scrollbarTacticalSx,
} from "../theme";

type TransferPanelProps = {
  onClose: () => void;
};

const ACCENT = appAccent;

const noop = () => {};

export default function TransferPanel({ onClose }: TransferPanelProps) {
  return (
    <>
      <ClassificationBanner
        accent={ACCENT}
        label="Transfer"
        status="Data movement"
        onClose={onClose}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          p: 2,
          ...scrollbarTacticalSx,
        }}
      >
        <Stack spacing={1.5}>
          <TacticalSection label="Incoming" accent={ACCENT}>
            <Stack spacing={0.85}>
              <TransferRow
                icon={<UploadFileIcon sx={{ fontSize: 18 }} />}
                label="Import"
                description="Load plans from a local file."
                onClick={noop}
              />
              <TransferRow
                icon={<CloudDownloadIcon sx={{ fontSize: 18 }} />}
                label="WIDOW Import"
                description="Pull plan data from a WIDOW source."
                onClick={noop}
              />
              <TransferRow
                icon={<AssignmentIcon sx={{ fontSize: 18 }} />}
                label="Tasking Message"
                description="Accept an incoming tasking message."
                onClick={noop}
              />
            </Stack>
          </TacticalSection>

          <TacticalSection label="Outgoing" accent={ACCENT}>
            <Stack spacing={0.85}>
              <TransferRow
                icon={<FileDownloadIcon sx={{ fontSize: 18 }} />}
                label="Export"
                description="Save plans to a local file."
                onClick={noop}
              />
              <TransferRow
                icon={<TableChartIcon sx={{ fontSize: 18 }} />}
                label="Export to Excel"
                description="Save plans as an Excel spreadsheet."
                onClick={noop}
              />
            </Stack>
          </TacticalSection>
        </Stack>
      </Box>
    </>
  );
}

function TransferRow({
  icon,
  label,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "stretch",
        cursor: "pointer",
        bgcolor: "rgba(255,255,255,0.05)",
        borderRadius: 2,
        overflow: "hidden",
        transition: "background-color 140ms ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.09)",
        },
        "&:hover .transfer-chevron": {
          transform: "translateX(3px)",
          color: ACCENT,
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ flex: 1, p: 1.25, minWidth: 0 }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            bgcolor: `${ACCENT}24`,
            color: ACCENT,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: 13.5,
              letterSpacing: 0.2,
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.2,
            }}
            noWrap
          >
            {label}
          </Typography>
          <Typography
            sx={{
              fontSize: 12.5,
              color: "text.secondary",
              lineHeight: 1.4,
              mt: 0.25,
            }}
          >
            {description}
          </Typography>
        </Box>
        <ChevronRightIcon
          className="transfer-chevron"
          sx={{
            fontSize: 20,
            color: "rgba(255,255,255,0.35)",
            transition: "transform 140ms ease, color 140ms ease",
            flexShrink: 0,
          }}
        />
      </Stack>
    </Box>
  );
}
