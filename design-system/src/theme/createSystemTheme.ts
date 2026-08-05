import { createTheme, type Theme } from "@mui/material/styles";

import { fontFamily, typePreset } from "../tokens";
import type { SemanticTokens } from "../tokens/semantic";

// Theme/Typography augmentation lives in ./augmentation.d.ts; it is applied
// globally via tsconfig `include` — no runtime import (a .d.ts has no JS).

/**
 * Builds a full MUI theme from a set of semantic tokens.
 *
 * The semantic set is attached verbatim to `theme.system` so components can
 * read role tokens (`theme.system.surface.card`) instead of raw hex. It also
 * seeds MUI's own palette/typography so stock MUI components inherit the look.
 * Swap the `semantic` argument → the whole system reskins.
 */
export function createSystemTheme(semantic: SemanticTokens): Theme {
  return createTheme({
    system: semantic,
    palette: {
      mode: "dark",
      background: {
        default: semantic.surface.page,
        paper: semantic.surface.menu,
      },
      primary: {
        main: semantic.accent.main,
        contrastText: semantic.accent.contrastText,
      },
      error: { main: semantic.feedback.danger },
      text: {
        primary: semantic.text.primary,
        secondary: semantic.text.secondary,
        disabled: semantic.text.disabled,
      },
      divider: semantic.border.default,
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily,
      bannerLabel: typePreset.bannerLabel,
      sectionLabel: typePreset.sectionLabel,
      dataLabel: typePreset.dataLabel,
      dataValue: typePreset.dataValue,
      meta: typePreset.meta,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          // No all-caps by default; opt in with textTransform where needed.
          root: { textTransform: "none" },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: "none" } },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: semantic.surface.page },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            bannerLabel: "span",
            sectionLabel: "span",
            dataLabel: "span",
            dataValue: "span",
            meta: "span",
          },
        },
      },
    },
  });
}
