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

- `plans` — list of `ExcavationPlan` records (seeded from [src/data/excavationPlans.ts](src/data/excavationPlans.ts)); each has an `isOpen` flag toggled by the panels.
- `expandedControls` — whether the header's panel-launcher buttons are visible (toggled by the folder icon).
- `selectedPanel` — which wizard panel (if any) is currently slid in; one of `"map" | "create" | "library" | "tools" | "review"`, or `null`.
- `selectedPlan` — the currently-active plan whose name shows in the header.

A global `keydown` listener in `App` maps **F1–F5** to the five panels and **Escape** to close the open panel. Hotkeys are suppressed while an input/textarea has focus. Pressing the hotkey for an already-open panel closes it.

### Panel switcher pattern

[src/components/WizardPanel.tsx](src/components/WizardPanel.tsx) is a thin switch on `selectedPanel` that renders one of the five panel components from [src/panels/](src/panels/). `App` overlays this panel absolutely on top of a full-viewport `DashboardContent` background (a static map PNG from `public/my-map.png` — see [public/README.md](public/README.md) for where to drop the image).

Each panel receives only the callbacks it needs. The cross-panel data flow worth knowing:

- **LibraryPanel** (`onOpenPlans`) — marks selected plans as `isOpen: true` in `App`, then switches `selectedPanel` to `"map"` so the user immediately sees them in the Open Plans list.
- **MapPanel** (`onSelectPlan`, `onClosePlan`) — `onSelectPlan` sets `selectedPlan` and dismisses the panel; `onClosePlan` flips a plan's `isOpen` to `false` and clears `selectedPlan` if it was the one closed.

If you add a new panel, you must touch four places: add the key to `PanelKey` in [src/types.ts](src/types.ts), add a hotkey + control entry in [src/App.tsx](src/App.tsx) and [src/components/AppHeader.tsx](src/components/AppHeader.tsx), and add the render branch in [src/components/WizardPanel.tsx](src/components/WizardPanel.tsx).

### Styling

All styling is inline via MUI's `sx` prop against the custom dark theme in [src/theme.ts](src/theme.ts) (primary `#90caf9`, paper `#1a1a1a`, default bg `#0f0f0f`). There are no CSS modules, no styled-components, no Tailwind. Panels use a consistent visual vocabulary — `#393939` panel surface, `#303030` cards, `#555` borders, `primary.main` for selected state — copy from a sibling panel when adding new UI rather than inventing new colors.
