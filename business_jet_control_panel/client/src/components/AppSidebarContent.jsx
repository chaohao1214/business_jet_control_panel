import React, { useContext, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/LightbulbOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunnyOutlined";
import TvIcon from "@mui/icons-material/TvOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Icon for dark mode
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Icon for light mode
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ThemeModeContext } from "../theme/ThemeModeContext";
const navItems = [
  { text: "Overview", icon: <HomeIcon />, path: "/overview" },
  { text: "Lighting", icon: <LightbulbIcon />, path: "/lighting" },
  { text: "Climate", icon: <WbSunnyIcon />, path: "/climate" },
  { text: "Entertainment", icon: <TvIcon />, path: "/entertainment" },
  { text: "Communication", icon: <PhoneIcon />, path: "/communication" },
];

const AppSidebarContent = ({ drawerWidth, onDrawerToggle }) => {
  const navigate = useNavigate();
  console.log("AppSidebarContent rendered. Props:", {
    drawerWidth,
    onDrawerToggle,
  });
  const [selectedIndex, setSelectedIndex] = useState(4);
  const { mode, toggleThemeMode } = useContext(ThemeModeContext); // change between dark/white mode
  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
    if (onDrawerToggle) {
      onDrawerToggle();
    }
    console.log("Navigate to:", path);
  };
  return (
    <Box
      sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        {" "}
        <Typography variant="h6" sx={{ mb: 2, px: 1, color: "text.primary" }}>
          Cabin Control
        </Typography>{" "}
        <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
          <IconButton onClick={toggleThemeMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Box>

      <List component="nav">
        {navItems.map((item, index) => (
          <ListItemButton
            key={item.text}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, item.path)}
            sx={{
              mb: 0.5,
              borderRadius: "8px",
              "&.Mui-selected": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selected",
                },
              },
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <ListItemIcon sx={{ color: "text.primary" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: "text.primary" }}>
              {item.text}
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default AppSidebarContent;
