import type { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { themes, type ThemeName } from "./themes";

export type SystemThemeProviderProps = {
  /** Which registered theme to apply. Defaults to `tacticalDark`. */
  theme?: ThemeName;
  children: ReactNode;
};

/**
 * App-root provider: applies a design-system theme + CssBaseline. Drop this at
 * the top of any app to consume the system. Storybook uses the same themes via
 * the toolbar switcher in `.storybook/preview.tsx`.
 */
export function SystemThemeProvider({
  theme = "tacticalDark",
  children,
}: SystemThemeProviderProps) {
  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
