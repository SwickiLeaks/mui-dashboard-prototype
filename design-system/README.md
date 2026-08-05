# Tactical Design System

A small MUI-based design system extracted from the dashboard prototype, based
only on the controls, containers, and colors the app actually shows. Demonstrated
in Storybook. Self-contained — it does not touch the parent app.

## Getting started

```bash
cd design-system
npm install
npm run storybook      # dev server on http://localhost:6006
npm run build-storybook
npm run typecheck
```

## Structure

- `src/tokens/` — `primitives` (the app's colors, radii, elevation, type) and
  `semantic` (the role aliases components consume — the layer a theme swaps).
- `src/theme/` — `createSystemTheme(semantic)` builds an MUI theme and hangs the
  semantic tokens on `theme.system`. `SystemThemeProvider` applies it.
- `src/components/`
  - Controls: `Button`, `IconButton`, `Pill`, `CountChip`, `IconChip`, `Text`
  - Containers: `Banner`, `Card`, `Tile`
  - Each has a `.stories.tsx`.
- `src/foundations/` — `Colors` and `Typography` token stories.

## The one rule

Components read **semantic tokens** (`theme.system.*`), never raw hex. A new
theme is just another `SemanticTokens` object registered in `theme/themes.ts` —
no component changes.

## Consuming in an app

```tsx
import { SystemThemeProvider, Banner, Tile, Button } from "tactical-design-system";

<SystemThemeProvider>
  <Banner label="Open Plans" status="2 Open" statusActive />
  <Tile title="LRASM Weapon Plan 1" active selected />
  <Button variant="solid" tone="accent">Open Library</Button>
</SystemThemeProvider>;
```
