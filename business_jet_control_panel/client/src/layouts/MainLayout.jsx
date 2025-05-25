import React from "react";
import { Box, CssBaseline } from "@mui/material";
import AppSidebar from "../components/AppSidebar";
const MainLayout = ({ children }) => {
  const sidebarWidth = 280;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />
      {/* sidebar */}
      <AppSidebar width={sidebarWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${sidebarWidth}px)` }}
      >
        {/* {<Toolbar />} */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
