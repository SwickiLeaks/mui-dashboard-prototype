import { createTheme } from "@mui/material/styles";

import { bodyFont } from "./tokens";

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
    fontFamily: bodyFont,
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
