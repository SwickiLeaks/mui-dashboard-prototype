import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import LayersIcon from "@mui/icons-material/Layers";
import ArticleIcon from "@mui/icons-material/Article";
import LinkOffIcon from "@mui/icons-material/LinkOff";

import { Banner } from "../components/Banner";
import { Button } from "../components/Button";
import { IconChip } from "../components/IconChip";
import { Pill } from "../components/Pill";
import { Text } from "../components/Text";
import { Tile } from "../components/Tile";
import { radius } from "../tokens";

/**
 * PATTERN — Open Plans panel.
 *
 * An app-level composition built entirely from design-system parts: `Banner`
 * (header + Close All `Button`) over a scroll body of `Tile`s. A selected tile
 * expands to show its associated plans (each an `IconChip` + `Text` + `Pill` +
 * danger `Button`) and a set of action `Button`s. Selecting an association
 * makes it Active while the parent tile stays expanded.
 *
 * Story-only — it lives in Storybook to demonstrate the pieces, not in the
 * shipped package.
 */
const meta: Meta = {
  title: "Patterns/Open Plans Panel",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Plan = {
  id: string;
  name: string;
  meta: string;
  description: string;
  associations: { id: string; name: string }[];
};

const PLANS: Plan[] = [
  {
    id: "lrasm-1",
    name: "LRASM Weapon Plan 1",
    meta: "Drafted by Garmin · 18 APR 2026",
    description: "A generic weapon plan with associated network and shape plans.",
    associations: [
      { id: "net-1", name: "Network Plan 1" },
      { id: "shape-1", name: "Shape Collection 1" },
    ],
  },
  {
    id: "gbux-1",
    name: "GBU-X Weapon Plan 1",
    meta: "Drafted by McLovin · 25 APR 2026",
    description: "Another weapon plan in the open list.",
    associations: [{ id: "net-2", name: "Network Plan 2" }],
  },
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

function AssociationRow({
  name,
  active,
  onSelect,
}: {
  name: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        py: 1,
        px: 1.25,
        borderRadius: radius.md,
        cursor: "pointer",
        bgcolor: active ? theme.system.accent.soft : "rgba(255,255,255,0.05)",
        border: `1px solid ${active ? theme.system.border.selected : "transparent"}`,
        "&:hover": { bgcolor: active ? theme.system.accent.soft : "rgba(255,255,255,0.09)" },
      })}
    >
      <IconChip size={28}>
        <ArticleIcon sx={{ fontSize: 14 }} />
      </IconChip>
      <Text preset="dataValue" noWrap sx={{ flex: 1, minWidth: 0 }}>
        {name}
      </Text>
      {active && <Pill tone="accent" size="sm">Active</Pill>}
      <Button
        size="sm"
        variant="soft"
        tone="danger"
        startIcon={<LinkOffIcon sx={{ fontSize: 12 }} />}
        onClick={(e) => e.stopPropagation()}
      >
        Disassociate
      </Button>
    </Box>
  );
}

function Demo() {
  const [expandedId, setExpandedId] = useState<string | null>("lrasm-1");
  const [activeId, setActiveId] = useState<string | null>("lrasm-1");

  return (
    <PanelShell>
      <Banner
        label="Open Plans"
        status={`${PLANS.length} Open`}
        statusActive
        rightSlot={
          <Button size="sm" variant="soft" tone="danger" startIcon={<CloseIcon sx={{ fontSize: 13 }} />}>
            Close All
          </Button>
        }
      />
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 2 }}>
        <Stack spacing={2}>
          {PLANS.map((plan) => {
            const expanded = expandedId === plan.id;
            return (
              <Tile
                key={plan.id}
                title={plan.name}
                meta={plan.meta}
                active={activeId === plan.id}
                selected={expanded}
                onClick={() => {
                  setExpandedId(plan.id);
                  setActiveId(plan.id);
                }}
                onClose={() => {}}
              >
                <Text preset="body">{plan.description}</Text>
                {expanded && (
                  <Box onClick={(e) => e.stopPropagation()}>
                    <Stack spacing={1.5} sx={{ mt: 0.5 }}>
                      {plan.associations.length > 0 && (
                        <Box>
                          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                            <Text preset="sectionLabel">Associated plans</Text>
                          </Stack>
                          <Stack spacing={0.75}>
                            {plan.associations.map((a) => (
                              <AssociationRow
                                key={a.id}
                                name={a.name}
                                active={activeId === a.id}
                                onSelect={() => setActiveId(a.id)}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}
                      <Box>
                        <Text preset="sectionLabel" sx={{ mb: 1, display: "block" }}>
                          Plan actions
                        </Text>
                        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                          <Button size="sm" variant="outline" startIcon={<FlagIcon sx={{ fontSize: 15 }} />}>
                            Add mission
                          </Button>
                          <Button size="sm" variant="outline" startIcon={<LayersIcon sx={{ fontSize: 15 }} />}>
                            Add shape collection
                          </Button>
                          <Button size="sm" variant="outline" startIcon={<ArticleIcon sx={{ fontSize: 15 }} />}>
                            Add plan
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                )}
              </Tile>
            );
          })}
        </Stack>
      </Box>
    </PanelShell>
  );
}

export const Default: StoryObj = { render: () => <Demo /> };
