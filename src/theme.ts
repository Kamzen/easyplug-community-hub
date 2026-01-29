import { createTheme, alpha } from "@mui/material/styles";

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
    fontFamily: "Lucida Sans Unicode",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          height: 40
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "all 0.3s ease",
          // background: "rgba(255,255,255,0.98)",
          boxShadow: "0 2px 8px 0 rgba(102,126,234,0.04)"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "all 0.3s ease",
          // background: "rgba(255,255,255,0.98)",
          fontSize: 16,
          fontWeight: 500,
          boxShadow: "0 2px 8px 0 rgba(102,126,234,0.04)"
        },
        notchedOutline: {
          borderColor: "#667eea",
          borderWidth: 1
        },
        input: {
          padding: "14px 16px",
          fontSize: 16,
          fontWeight: 500,
          borderRadius: 12
          // background: "rgba(255,255,255,0.98)"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: 15,
          color: "#667eea",
          letterSpacing: 0.2
        },
        shrink: {
          color: "#764ba2",
          fontWeight: 700
        }
      }
    }
  }
});

export default theme;
