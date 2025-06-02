import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeModeProvider } from "./theme/ThemeModeContext";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeModeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeModeProvider>
  </StrictMode>
);
