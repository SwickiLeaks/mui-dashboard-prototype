/**
 * MUI module augmentation.
 *
 * Teaches TypeScript that our theme carries a `system` bag of semantic tokens
 * and that Typography has our custom presets. This is what makes
 * `theme.system.surface.card` and `<Typography variant="dataLabel" />` type-safe.
 */
import type { CSSProperties } from "react";
import type { SemanticTokens } from "../tokens/semantic";

declare module "@mui/material/styles" {
  interface Theme {
    system: SemanticTokens;
  }
  interface ThemeOptions {
    system?: SemanticTokens;
  }

  interface TypographyVariants {
    bannerLabel: CSSProperties;
    sectionLabel: CSSProperties;
    dataLabel: CSSProperties;
    dataValue: CSSProperties;
    meta: CSSProperties;
  }
  interface TypographyVariantsOptions {
    bannerLabel?: CSSProperties;
    sectionLabel?: CSSProperties;
    dataLabel?: CSSProperties;
    dataValue?: CSSProperties;
    meta?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bannerLabel: true;
    sectionLabel: true;
    dataLabel: true;
    dataValue: true;
    meta: true;
  }
}
