import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { themes as systemThemes } from "../src/theme";

/**
 * The theme decorator wires the design-system themes into Storybook's toolbar
 * theme switcher. Only `Tactical Dark` ships today; adding another entry here
 * (a second `createSystemTheme(...)` result) is the only change needed to make
 * the switcher offer more — no component edits.
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    options: {
      storySort: {
        order: ["Foundations", "Atoms", "Molecules", "Patterns"],
      },
    },
    layout: "centered",
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: { "Tactical Dark": systemThemes.tacticalDark },
      defaultTheme: "Tactical Dark",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;
