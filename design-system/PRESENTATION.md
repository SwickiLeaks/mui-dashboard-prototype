# Tactical Design System — Presentation Guide

A walkthrough of every piece of the design system, from the foundation up.

## The one-sentence pitch

A small, themeable MUI component library distilled from the dashboard prototype,
where **every component reads named "semantic" tokens instead of hardcoded
colors** — so the whole system is consistent, documented in Storybook, and
reskinnable by swapping one file.

Two principles to lead with:

1. **Tokens over hardcoded values** — no component contains a raw hex code.
2. **Composability over specificity** — small pieces combine into bigger ones,
   rather than building bespoke one-offs.

---

## Layer 1 — Design Tokens (`src/tokens/`)

The vocabulary of the system. Two tiers, and the two-tier split is the important
idea to explain:

- **Primitives** (`src/tokens/primitives.ts`) — the raw values: the color ramp
  (`#0f0f0f` → `#323232`), the accent `#90caf9`, danger red, the type scale,
  radii, and elevations. These are *what colors exist*.
- **Semantic** (`src/tokens/semantic.ts`) — **roles**, not colors:
  `surface.card`, `text.secondary`, `border.selected`, `accent.soft`. These are
  *what colors mean*. This is the layer components actually use.

**Why it matters (the talking point):** a component says "paint me
`surface.card`," not "paint me `#2d2d2d`." Change what `surface.card` points to,
and every card in the system updates. That indirection is the whole ballgame.

---

## Layer 2 — Theme (`src/theme/`)

The machinery that turns tokens into something React/MUI can use.

- **`createSystemTheme(semantic)`** (`src/theme/createSystemTheme.ts`) — builds a
  standard MUI theme, seeds MUI's own palette/typography from the tokens (so even
  stock MUI components inherit the look), and hangs the semantic tokens on
  `theme.system` so our components can read them.
- **`SystemThemeProvider`** (`src/theme/SystemThemeProvider.tsx`) — the one
  wrapper you put at the root of an app to opt in.

**Why it matters:** "a theme is just one semantic-token object." We ship
`tacticalDark` today; adding a light theme later is a new token object registered
in one file — **zero component changes**. That's the promise of the token
architecture, made concrete.

---

## Layer 3 — Components (`src/components/`)

The reusable, shippable parts. Nine, in two groups.

**Controls (atoms)** — the smallest interactive/display primitives:

| Component | What it is | Consolidation win |
| --- | --- | --- |
| `Button` | One button: `variant` (solid/soft/outline/ghost) × `tone` (neutral/accent/danger) | Replaced three inconsistent button styles |
| `IconButton` | Icon-only, with selectable/active state + circular danger variant | Unified the header rail + close buttons |
| `Pill` | Small status label ("Active", "Open") | Replaced 3–4 pill copies |
| `CountChip` | Numeric count badge | — |
| `IconChip` | Circular tinted icon container | Replaced 7 hand-rolled copies |
| `Text` | Typography bound to the type scale (title, sectionLabel, dataLabel…) | Retired bespoke label `sx` blocks |

**Containers (molecules)** — small, still-generic groupings of atoms:

| Component | What it is |
| --- | --- |
| `Banner` | Panel header: label + status + close/action |
| `Card` | Base surface with rest / hover / selected states |
| `Tile` | A `Card` with the standard header (title + `Pill` + close) |

**Why it matters:** point at `Button` or `IconChip` and say "this single
component absorbed a pile of copy-pasted styling from the app." That's the
consolidation win — the concrete ROI.

---

## Layer 4 — Patterns (`src/patterns/`)

App-level compositions that show the pieces working together: **Open Plans
Panel** and **Library Panel**. These assemble the atoms and molecules into
recognizable app screens.

**Key distinction to make on stage:** these are **demonstrations, not shipped
components.** They live only in Storybook because they encode *this app's* logic
(plans, associations, the library drilldown). It shows the reusable parts in a
real context without pretending app-specific screens are reusable. This is the
"atoms → molecules → organisms" ladder — patterns sit at the top, closest to the
app.

---

## The vehicle — Storybook + Foundations

- **Storybook** is the living catalog: every component has a story with
  interactive controls, so people can toggle props and see variants without
  reading code.
- **Foundations** (`src/foundations/`) — `Colors` and `Typography` stories that
  render the tokens themselves, so the vocabulary is documented visually.

---

## How to close

The through-line:

> **Tokens define the vocabulary → the theme distributes it → components consume
> it → patterns compose them → Storybook documents all of it.**

One source of truth, consistent by construction, and reskinnable by swapping a
single token file.

---

## Appendix — the atomic-design ladder

| Rung | In this system | Reusable? |
| --- | --- | --- |
| Atoms | Button, IconButton, Pill, CountChip, IconChip, Text | Yes (shipped) |
| Molecules | Banner, Card, Tile | Yes (shipped) |
| Organisms / Patterns | Open Plans Panel, Library Panel | No (Storybook demos — app-specific) |

Rule of thumb: reusable across *any* app → atom/molecule (belongs in the design
system). Only makes sense in *this* app → organism/pattern (lives in the app, or
a separate app-patterns layer that consumes the design system).

---

## What is this, technically? (MUI + tokens + `sx`)

A common question: "is this MUI overrides plus custom CSS?" Close, but there are
really **three** mechanisms, and "custom CSS" isn't quite the right label:

1. **MUI components as the base.** Every component wraps a MUI primitive —
   `Button` wraps MUI's `Button`, `Card`/`Pill`/`IconChip` wrap `Box`, `Text`
   wraps `Typography`. We don't reimplement behavior, just re-skin and constrain
   the API.
2. **A small amount of MUI theme-level overrides.** `createSystemTheme.ts`
   configures the MUI theme: palette, typography (incl. our custom `Text`
   variants), and a handful of `components.styleOverrides` (e.g. `MuiButton` →
   `textTransform: none`, `MuiPaper` → `backgroundImage: none`, `MuiCssBaseline`
   → page background). This is the actual "MUI overrides" part, kept thin.
3. **Per-component styling via the `sx` prop — not hand-written CSS.** The bulk
   of the look lives in each component's `sx` blocks, which read the semantic
   tokens. `sx` is **CSS-in-JS**: MUI compiles it through **Emotion** into real
   CSS at runtime. There are **no `.css` files, no CSS modules, no Tailwind, no
   authored global stylesheet** — the only global CSS is MUI's `CssBaseline`
   reset.

Most precise framing:

> Custom React components wrapping MUI primitives, styled with MUI's `sx` prop
> (Emotion CSS-in-JS) that reads design tokens — on top of a lightweight MUI
> theme override.

And one piece that isn't CSS at all: the **tokens themselves** are plain
TypeScript objects (values like `"#2d2d2d"` and `accentAlpha(0.16)`), not CSS
variables. That's what makes a theme swap a pure data change rather than a
stylesheet change. (This same approach *could* emit CSS custom properties via
MUI's CSS-variables mode — but as built, it's CSS-in-JS via `sx`.)

---

## How developers use it: pre-applied tokens + the `sx` escape hatch

The shipped components come with **tokens already applied**. A developer writes
`<Tile title="…" active selected />` and gets the correct surfaces, borders,
elevation, and states with zero styling knowledge — the tokens are baked into the
component's base `sx`; the consumer never touches them directly.

- **Props are the first-class way to vary a component.** Before reaching for
  `sx`, the intended dials are the component's own props — `variant`, `tone`,
  `size`, `active`, `selected`. Those are the supported variations, and they stay
  on-token.
- **`sx` is the escape hatch for one-offs.** Every component takes an `sx` prop
  and merges it **after** its base styles, so the consumer's `sx` wins on any
  conflict:

  ```tsx
  sx={[
    (theme) => ({ /* base styles from tokens */ }),
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []), // consumer sx appended last → higher precedence
  ]}
  ```

  So a developer can nudge placement for a specific spot
  (`<Button sx={{ mt: 2, width: "100%" }} />`) without forking the component.

Two guardrails worth stating:

- **It's a nudge, not a redesign.** If someone re-styles a component's core
  appearance through `sx` repeatedly, that's the signal it should become a new
  prop/variant or a new component — not a per-use override. Keeping restyling out
  of `sx` is what preserves consistency.
- **Even in `sx`, reach for tokens, not hex.** A one-off can stay on-system by
  pulling from the theme — `sx={{ color: (theme) => theme.system.accent.main }}`
  — so overrides don't reintroduce hardcoded values.

In one line: **props for supported variation, `sx` for last-mile
layout/placement tweaks, and the component's tokenized base does everything else
by default.**
