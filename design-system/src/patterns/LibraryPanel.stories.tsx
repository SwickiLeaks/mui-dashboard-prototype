import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Breadcrumbs, Menu, MenuItem, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ShieldIcon from "@mui/icons-material/Shield";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

import { Banner } from "../components/Banner";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CountChip } from "../components/CountChip";
import { IconChip } from "../components/IconChip";
import { Pill } from "../components/Pill";
import { Text } from "../components/Text";
import { radius } from "../tokens";

/**
 * PATTERN — Library panel.
 *
 * Drilldown from buckets → items, composed from design-system parts: `Banner`,
 * a breadcrumb + filter `Button`/`Menu`, `Card` rows (`IconChip` + `Text` +
 * `CountChip`), and a multi-select item list feeding a footer count + deploy
 * `Button`. Story-only — a demonstration, not a shipped component.
 */
const meta: Meta = {
  title: "Patterns/Library Panel",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Bucket = { key: string; label: string; desc: string; count: number; icon: React.ReactNode };

const BUCKETS: Bucket[] = [
  { key: "standards", label: "Squadron Standards", desc: "Approved templates.", count: 12, icon: <ShieldIcon /> },
  { key: "mine", label: "My Items", desc: "Plans you own.", count: 5, icon: <PersonIcon /> },
  { key: "favorites", label: "My Favorites", desc: "Bookmarked for quick access.", count: 3, icon: <StarIcon /> },
];

const ITEMS = [
  { id: "lrasm-1", name: "LRASM Weapon Plan 1", open: true },
  { id: "lrasm-2", name: "LRASM Weapon Plan 2", open: false },
  { id: "net-1", name: "Network Plan 1", open: false },
  { id: "shape-1", name: "Shape Collection 1", open: true },
];

function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ height: "100vh", p: 3, boxSizing: "border-box" }}>
      <Box
        sx={(theme) => ({
          width: 440,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: theme.system.surface.panel,
          border: `1px solid ${theme.system.border.default}`,
          borderRadius: radius.xl,
        })}
      >
        {children}
      </Box>
    </Box>
  );
}

function Demo() {
  const [bucket, setBucket] = useState<Bucket | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [filterEl, setFilterEl] = useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState("All");

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const atItems = Boolean(bucket);

  return (
    <PanelShell>
      <Banner label="Library" status={bucket ? bucket.label : "Browse"} statusActive onClose={() => {}} />

      {/* Breadcrumb + filter strip */}
      <Box
        sx={(theme) => ({
          px: 2,
          py: 1.25,
          borderBottom: `1px solid ${theme.system.border.hairline}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        })}
      >
        <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }} />}>
          <Box
            component="button"
            onClick={() => {
              setBucket(null);
              setSelected([]);
            }}
            sx={{ border: 0, bgcolor: "transparent", cursor: "pointer", p: 0 }}
          >
            <Text preset="meta" sx={{ color: atItems ? "text.secondary" : "text.primary" }}>
              Library
            </Text>
          </Box>
          {bucket && <Text preset="meta" sx={{ color: "text.primary" }}>{bucket.label}</Text>}
        </Breadcrumbs>

        {atItems && (
          <>
            <Button
              size="sm"
              variant="outline"
              startIcon={<FilterListIcon sx={{ fontSize: 15 }} />}
              onClick={(e) => setFilterEl(e.currentTarget)}
            >
              {filter}
            </Button>
            <Menu anchorEl={filterEl} open={Boolean(filterEl)} onClose={() => setFilterEl(null)}>
              {["All", "Open", "Closed"].map((f) => (
                <MenuItem
                  key={f}
                  selected={filter === f}
                  onClick={() => {
                    setFilter(f);
                    setFilterEl(null);
                  }}
                >
                  {f}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 2 }}>
        {!atItems ? (
          <Stack spacing={1}>
            {BUCKETS.map((b) => (
              <Card key={b.key} onClick={() => setBucket(b)}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 1.75 }}>
                  <IconChip size={40}>{b.icon}</IconChip>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Text preset="sectionLabel">{b.label}</Text>
                    <Text preset="meta" sx={{ display: "block" }}>{b.desc}</Text>
                  </Box>
                  <CountChip count={b.count} />
                  <ChevronRightIcon sx={{ fontSize: 19, color: "rgba(255,255,255,0.3)" }} />
                </Stack>
              </Card>
            ))}
          </Stack>
        ) : (
          <Stack spacing={1}>
            {ITEMS.map((item) => {
              const isSel = selected.includes(item.id);
              return (
                <Card key={item.id} selected={isSel} onClick={() => toggle(item.id)}>
                  <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 1.75 }}>
                    <Box sx={{ display: "inline-flex", color: isSel ? "primary.main" : "rgba(255,255,255,0.35)" }}>
                      {isSel ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        <CircleOutlinedIcon sx={{ fontSize: 20 }} />
                      )}
                    </Box>
                    <Text preset="title" sx={{ flex: 1, fontSize: 15 }} noWrap>
                      {item.name}
                    </Text>
                    {item.open && <Pill tone="accent" size="sm">Open</Pill>}
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        )}
      </Box>

      {/* Footer (item level only) */}
      {atItems && (
        <Box
          sx={(theme) => ({
            flexShrink: 0,
            px: 2,
            py: 1.5,
            borderTop: `1px solid ${theme.system.border.hairline}`,
          })}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <CountChip count={selected.length} dimWhenEmpty />
            <Text preset="meta" sx={{ flex: 1 }}>
              {selected.length ? `${selected.length} selected` : "Nothing selected"}
            </Text>
            <Button variant="ghost" onClick={() => setSelected([])}>
              Cancel
            </Button>
            <Button variant="solid" tone="accent" disabled={selected.length === 0} onClick={() => setSelected([])}>
              Open
            </Button>
          </Stack>
        </Box>
      )}
    </PanelShell>
  );
}

export const Default: StoryObj = { render: () => <Demo /> };
