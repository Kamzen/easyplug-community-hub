import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
      dark: "#764ba2",
      contrastText: "#fff"
    },
    secondary: {
      main: "#764ba2",
      contrastText: "#fff"
    },
    background: {
      default: "#f5f6fa",
      paper: "rgba(255,255,255,0.97)"
    },
    success: {
      main: "#43a047"
    },
    warning: {
      main: "#ffa726"
    },
    error: {
      main: "#e53935"
    }
  },
  typography: {
    fontFamily: "Poppins, Roboto, Arial, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700 }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 700
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
});

export default theme;
