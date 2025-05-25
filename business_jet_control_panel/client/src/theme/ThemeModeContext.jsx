import React, { createContext, useContext, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

export const ThemeModeContext = createContext({
  toggleThemeMode: () => {},
  mode: "dark",
});

export const useThemeMode = () => useContext(ThemeModeContext);
export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      const storeMode = window.localStorage.getItem("themeMode");
      return storeMode ? storeMode : "dark";
    } catch (error) {
      console.warn("localStorage is not available. Defaulting to dark mode.");
      return "dark";
    }
  });
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          try {
          } catch (error) {
            console.warn("Could not save themeMode to localStorage.");
          }
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );
  //create theme based on the current mode
  const theme = useMemo(() => createTheme(getDesignTokens(mode), [mode]));

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};
