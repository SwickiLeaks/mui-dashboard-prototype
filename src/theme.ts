import { createTheme } from "@mui/material/styles";

/**
 * Shared "active/selected" treatment so selection reads the same everywhere
 * without resorting to the primary-blue palette. Components that have a
 * contextual color (e.g. Library bucket accent) layer it on top of `bg`.
 */
export const selectionStyles = {
  bg: "#383838",
  bgRest: "#303030",
  border: "rgba(255, 255, 255, 0.45)",
  borderRest: "#555",
  ring: "0 0 0 1px rgba(255, 255, 255, 0.18)",
  glow: "0 8px 22px rgba(0, 0, 0, 0.45)",
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f0f0f",
      paper: "#1a1a1a",
    },
    primary: {
      main: "#90caf9",
    },
    text: {
      primary: "#e6e6e6",
      secondary: "#9e9e9e",
    },
  },
  typography: {
    fontFamily:
      '"Chakra Petch", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
        },
      },
    },
  },
});
