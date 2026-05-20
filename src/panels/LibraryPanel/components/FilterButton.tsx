import { Button, Menu, MenuItem } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

import { monoFont } from "../../../theme";
import type { PlanFilter } from "../types";

type FilterButtonProps = {
  filter: PlanFilter;
  anchorEl: HTMLElement | null;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onChange: (value: PlanFilter) => void;
};

const labelMap: Record<PlanFilter, string> = {
  all: "ALL",
  open: "OPEN",
  closed: "CLOSED",
};

export default function FilterButton({
  filter,
  anchorEl,
  onOpen,
  onClose,
  onChange,
}: FilterButtonProps) {
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        size="small"
        startIcon={<FilterListIcon sx={{ fontSize: 15 }} />}
        onClick={onOpen}
        sx={{
          fontFamily: monoFont,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.3,
          textTransform: "uppercase",
          height: 26,
          px: 1,
          color: "text.secondary",
          bgcolor: "#242424",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 0.5,
          whiteSpace: "nowrap",
          flexShrink: 0,
          "& .MuiButton-startIcon": { mr: 0.5 },
          "&:hover": {
            bgcolor: "#2c2c2c",
            color: "text.primary",
            borderColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        {labelMap[filter]}
      </Button>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 0.75,
            bgcolor: "#1c1c1c",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 0.5,
            minWidth: 130,
            backgroundImage: "none",
          },
        }}
      >
        {(["all", "open", "closed"] as const).map((value) => (
          <MenuItem
            key={value}
            selected={filter === value}
            onClick={() => onChange(value)}
            sx={{
              fontFamily: monoFont,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: 1.3,
              color: "text.secondary",
              "&.Mui-selected": { bgcolor: "#2a2a2a", color: "text.primary" },
              "&.Mui-selected:hover, &:hover": {
                bgcolor: "#262626",
                color: "text.primary",
              },
            }}
          >
            {labelMap[value]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
