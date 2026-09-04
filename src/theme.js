import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0D0D0D",
      paper: "#111111",
    },
    primary: {
      main: "#4F46E5",
      light: "#818CF8",
    },
    secondary: {
      main: "#22D3EE",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'JetBrains Mono', monospace" },
    h2: { fontFamily: "'JetBrains Mono', monospace" },
    h3: { fontFamily: "'JetBrains Mono', monospace" },
    h4: { fontFamily: "'JetBrains Mono', monospace" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#111111",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
          "&:hover": {
            borderColor: "rgba(79, 70, 229, 0.5)",
            boxShadow: "0 8px 32px rgba(79, 70, 229, 0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(13,13,13,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#111111",
            borderRadius: 8,
            "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
            "&:hover fieldset": { borderColor: "rgba(79,70,229,0.4)" },
            "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            color: "#B3B3B3",
            borderColor: "rgba(255,255,255,0.1)",
            "&.Mui-selected": {
              background: "linear-gradient(135deg, #4F46E5, #22D3EE)",
              color: "#fff",
              borderColor: "transparent",
            },
            "&:hover": { backgroundColor: "rgba(79,70,229,0.1)" },
          },
        },
      },
    },
  },
});

export default theme;