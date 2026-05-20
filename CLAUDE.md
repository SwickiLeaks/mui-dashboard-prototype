# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) and produce a production bundle in `dist/`
- `npm run preview` — serve the built bundle locally

There is no test runner, linter, or formatter configured in this project.

## Architecture

This is a Vite + React 18 + TypeScript + MUI v6 dark-themed dashboard prototype. All state is in-memory React state; there is no backend, router, or persistence.

### Top-level state lives in [src/App.tsx](src/App.tsx)

`App` owns four pieces of state that flow down as props:

- `plans` — list of `WeaponPlan` records (seeded from [src/data/weaponPlans.ts](src/data/weaponPlans.ts)); each has an `isOpen` flag toggled by the panels.
- `expandedControls` — whether the header's panel-launcher buttons are visible (toggled by the folder icon).
- `selectedPanel` — which wizard panel (if any) is currently slid in; one of `"map" | "create" | "library" | "tools" | "review"`, or `null`.
- `selectedPlan` — the currently-active plan whose name shows in the header.

A global `keydown` listener in `App` maps **F1–F5** to the five panels and **Escape** to close the open panel. Hotkeys are suppressed while an input/textarea has focus. Pressing the hotkey for an already-open panel closes it.

### Panel switcher pattern

[src/components/WizardPanel.tsx](src/components/WizardPanel.tsx) is a thin switch on `selectedPanel` that renders one of the five panel components from [src/panels/](src/panels/). `App` overlays this panel absolutely on top of a full-viewport `DashboardContent` background (a static map PNG from `public/my-map.png` — see [public/README.md](public/README.md) for where to drop the image).

Each panel receives only the callbacks it needs. The cross-panel data flow worth knowing:

- **LibraryPanel** (`onOpenPlans`) — marks selected plans as `isOpen: true` in `App`, then switches `selectedPanel` to `"map"` so the user immediately sees them in the Open Plans list.
- **MapPanel** (`onSelectPlan`, `onClosePlan`) — `onSelectPlan` sets `selectedPlan` and dismisses the panel; `onClosePlan` flips a plan's `isOpen` to `false` and clears `selectedPlan` if it was the one closed.

If you add a new panel, you must touch four places: add the key to `PanelKey` in [src/types.ts](src/types.ts), add a hotkey + control entry in [src/App.tsx](src/App.tsx) and [src/components/AppHeader/data.tsx](src/components/AppHeader/data.tsx), and add the render branch in [src/components/WizardPanel.tsx](src/components/WizardPanel.tsx).

### Folder layout for the transplantable components

Large components live in their own folder with the shape `index.tsx` + `components/` + `styles.ts` + `utils.ts` + (sometimes) `types.ts` / `data.tsx`. The folder is the unit of transplant — drop it into another app and wire the props. This applies to [src/components/AppHeader/](src/components/AppHeader/), [src/components/PlanDetailDrawer/](src/components/PlanDetailDrawer/), [src/panels/OpenPlansPanel/](src/panels/OpenPlansPanel/), and [src/panels/LibraryPanel/](src/panels/LibraryPanel/). Smaller panels (Create/Tools/Review) and helpers (WizardPanel, PanelHeader, PanelActions) remain single files.

### Theme

The "tactical" dark theme is centralized in [src/theme/](src/theme/):
- [tokens.ts](src/theme/tokens.ts) — color / font / scrollbar / selection style tokens (`tacticalSurface`, `monoFont`, `selectionStyles`, `scrollbarTacticalSx`, etc.)
- [muiTheme.ts](src/theme/muiTheme.ts) — the MUI `darkTheme` (primary `#90caf9`, paper `#1a1a1a`, default bg `#0f0f0f`)
- [components.tsx](src/theme/components.tsx) — shared theme-aware UI: `ClassificationBanner`, `TacticalSection`, `DataRow`
- [index.ts](src/theme/index.ts) — single import entry: `import { ... } from "../theme"`

All styling is inline via MUI's `sx` prop against these tokens — no CSS modules, no styled-components, no Tailwind. When transplanting components, drop in `src/theme/` and `src/utils/` first, then `ThemeProvider({ theme: darkTheme })` at the app root.

Shared formatting helpers (`formatMilitary`, `formatMilitaryShort`, `pad2`) live in [src/utils/formatting.ts](src/utils/formatting.ts).
