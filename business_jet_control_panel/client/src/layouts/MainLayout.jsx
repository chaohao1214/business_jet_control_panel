import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import AppSidebarContent from "../components/AppSidebarContent";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles"; // Recommended change
const MainLayout = ({ children }) => {
  const DRAWER_WIDTH = 280;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false); // State for temporary drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerContent = (
    <AppSidebarContent
      drawerWidth={DRAWER_WIDTH}
      onDrawerToggle={isMobile ? handleDrawerToggle : undefined}
    />
  );
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>{" "}
        </Toolbar>
      </AppBar>
      {/* {Drawer} */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              bgcolor: "background.paper",
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Permanent Drawer for large screens (desktop) - THIS WAS MISSING */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" }, // Hide on xs, sm; display on md and up
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              bgcolor: "background.paper",
              borderRight: (theme) => `1px solid ${theme.palette.divider}`, // Optional: adds a border
            },
          }}
          open // Permanent drawer is always open by definition
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: "56px", sm: "64px" },
        }}
      >
        {/* {<Toolbar />} */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
