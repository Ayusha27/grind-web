import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#f47920",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#ffffff",
    },

    background: {
      default: "#0b0b0b",
      paper: "#171717",
    },

    text: {
      primary: "#f5f5f0",
      secondary: "rgba(255, 255, 255, 0.75)",
    },

    divider: "rgba(255, 255, 255, 0.08)",
  },

  typography: {
    fontFamily: '"DM Sans", sans-serif',

    h1: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontWeight: 400,
      letterSpacing: "1px",
    },

    h2: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontWeight: 400,
      letterSpacing: "1px",
    },

    h3: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontWeight: 400,
      letterSpacing: "1px",
    },

    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowX: "hidden",
        },

        body: {
          margin: 0,
          backgroundColor: "#0b0b0b",
          color: "#f5f5f0",
          overflowX: "hidden",
        },

        "*": {
          boxSizing: "border-box",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "16px 28px",
          fontWeight: 700,
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});