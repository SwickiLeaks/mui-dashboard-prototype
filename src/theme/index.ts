/**
 * Theme entry point. Re-exports the MUI theme, tactical style tokens, and
 * the shared theme-aware components (ClassificationBanner, TacticalSection,
 * DataRow). When transplanting this UI to another app, drop this whole folder
 * in and `ThemeProvider({ theme: darkTheme })` at the root.
 */
export { darkTheme } from "./muiTheme";
export {
  monoFont,
  monoLabelSx,
  monoValueSx,
  scrollbarTacticalSx,
  selectionStyles,
  tacticalSurface,
} from "./tokens";
export { ClassificationBanner, DataRow, TacticalSection } from "./components";
