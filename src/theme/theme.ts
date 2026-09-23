import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#FF5C35",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#4C4A49",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#13131A",
      paper: "#13131A",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },

    divider: "rgba(76, 74, 73, 0.35)",
  },

  typography: {
    /*
     * Default body font.
     *
     * This matches the GRIND public/start-your-journey
     * PHP pages.
     */
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

    h4: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
    },

    h5: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
    },

    h6: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
    },

    body1: {
      fontFamily: '"DM Sans", sans-serif',
    },

    body2: {
      fontFamily: '"DM Sans", sans-serif',
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
          backgroundColor: "#13131A",
          color: "#FFFFFF",
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