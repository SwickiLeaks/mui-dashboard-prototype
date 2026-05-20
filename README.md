# MUI Dashboard Prototype

Updated export generated from the current ChatGPT working session.

## Included updates

- Header hidden control bar / folder-toggle model
- App switcher icon and divider
- F1-F5 hotkeys
- Open Plans panel with empty state, Close All, associated plans, disassociate action, and direct loading on select
- Library panel redesigned around:
  - Group Standards
  - My Items
  - My Favorites
  - Crew Folders
  - drill-down categories for My Items and Crew Folders
  - real excavation plan data derived from `plans`
  - Open Plans footer action for selectable excavation plans
- Tools and Review panels styled consistently with the dark theme

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Vite outputs deployable static assets to `dist/`.
