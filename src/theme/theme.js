import { createTheme } from "@mui/material/styles";

// `surface` holds the site's background tints so components can say
// `bgcolor: "surface.hero"` and get the right colour in each mode.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#244C3A",
          dark: "#173528",
          light: "#496F5B",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#C6A15B",
        },
        background: {
          default: "#FBF9F4",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#252A27",
          secondary: "#70766F",
        },
        divider: "#EAE7DF",
        surface: {
          header: "rgba(255,255,255,0.96)",
          hero: "#F2F0E6",
          alt: "#F0EFE6",
          quote: "#F7F4EC",
          tint: "#EEF2EA",
          hover: "#F4F5EF",
          sage: "#DDE5D9",
          sand: "#E8DFCC",
          scrollThumb: "#CFCAB9",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#8CC3A5",
          dark: "#D3E6DA",
          light: "#B5D8C4",
          contrastText: "#10261B",
        },
        secondary: {
          main: "#D4B26E",
        },
        background: {
          default: "#111814",
          paper: "#19221D",
        },
        text: {
          primary: "#E7EBE7",
          secondary: "#A4AEA6",
        },
        divider: "#2C3832",
        surface: {
          header: "rgba(17,24,20,0.94)",
          hero: "#16201A",
          alt: "#141C17",
          quote: "#212A22",
          tint: "#22342A",
          hover: "#1F2B24",
          sage: "#203328",
          sand: "#352E22",
          scrollThumb: "#3A4A41",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Georgia", "Times New Roman", serif',
      fontWeight: 500,
      letterSpacing: "-1.8px",
    },
    h2: {
      fontFamily: '"Georgia", "Times New Roman", serif',
      fontWeight: 500,
      letterSpacing: "-1px",
    },
    h3: {
      fontFamily: '"Georgia", "Times New Roman", serif',
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "11px 22px",
          boxShadow: "none",
        },
      },
    },
    // Thin, theme-coloured scrollbar for the scrolling area of every popup.
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          overscrollBehavior: "contain",
          scrollbarWidth: "thin",
          scrollbarColor: `${theme.vars.palette.surface.scrollThumb} transparent`,
          "&::-webkit-scrollbar": { width: 8 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.vars.palette.surface.scrollThumb,
            borderRadius: 8,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.vars.palette.secondary.main,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "none",
          border: `1px solid ${theme.vars.palette.divider}`,
        }),
      },
    },
  },
});

export default theme;
