// color palettes and common settings
const commonTypography = {
  fontFamily: ['"Space Grotesk"', '"Noto Sans"', "sans-serif"].join(","),
  h1: { fontSize: "32px", fontWeight: 700, lineHeight: "tight" },
  h2: { fontSize: "22px", fontWeight: 700, letterSpacing: "-0.015em" },
  h6: { fontSize: "1rem", fontWeight: 500 }, // For titles like "Cabin Control"
  body1: { fontSize: "1rem" },
  body2: { fontSize: "0.875rem" },
  button: {
    fontSize: "0.875rem",
    fontWeight: 700,
    letterSpacing: "0.015em",
    textTransform: "none",
  },
};

const commonComponents = {
  MuiListItemButton: {
    styleOverrides: {
      root: {
        // Global ListItemButton styles if any
      },
    },
  },
};

// Function to get design tokens based on mode
export const getDesignTokens = (mode) => ({
  palette: {
    mode, // This is the key: 'light' or 'dark'
    ...(mode === "dark"
      ? {
          // Dark mode palette
          background: {
            default: "#101a23",
            paper: "#101a23",
          },
          text: {
            primary: "#ffffff",
            secondary: "#90adcb",
          },
          action: {
            selected: "#223649",
            hover: "rgba(255, 255, 255, 0.08)",
          },
          primary: {
            main: "#0c7ff2",
          },
          divider: "rgba(255, 255, 255, 0.12)",
        }
      : {
          // Light mode palette (new)
          background: {
            default: "#f4f6f8", // A common light grey background
            paper: "#ffffff", // Paper elements are white
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)", // Standard dark text for light backgrounds
            secondary: "rgba(0, 0, 0, 0.6)",
          },
          action: {
            selected: "#e3f2fd", // A light blue for selected items, works with primary.main
            hover: "rgba(0, 0, 0, 0.04)",
          },
          primary: {
            main: "#0c7ff2", // Can remain the same, or adjust if needed for contrast
          },
          divider: "rgba(0, 0, 0, 0.12)",
        }),
  },
  typography: commonTypography,
  components: commonComponents,
});
