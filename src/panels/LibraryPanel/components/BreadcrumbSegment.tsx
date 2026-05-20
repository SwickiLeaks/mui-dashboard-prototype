import { Typography } from "@mui/material";

import { monoFont } from "../../../theme";

type BreadcrumbSegmentProps = {
  label: string;
  isCurrent?: boolean;
  onClick?: () => void;
};

export default function BreadcrumbSegment({
  label,
  isCurrent,
  onClick,
}: BreadcrumbSegmentProps) {
  const sx = {
    fontFamily: monoFont,
    fontSize: 10.5,
    letterSpacing: 1.3,
    fontWeight: 700,
    maxWidth: 180,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  if (isCurrent || !onClick) {
    return (
      <Typography sx={{ ...sx, color: "text.primary" }}>{label}</Typography>
    );
  }

  return (
    <Typography
      onClick={onClick}
      sx={{
        ...sx,
        cursor: "pointer",
        color: "text.secondary",
        "&:hover": { color: "text.primary" },
      }}
    >
      {label}
    </Typography>
  );
}
