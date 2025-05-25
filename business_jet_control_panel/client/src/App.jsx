import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { useThemeMode } from "./theme/ThemeModeContext";
import { Box, Typography } from "@mui/material";

const PlaceholderPage = ({ title }) => {
  const { mode } = useThemeMode();
  return (
    <Box sx={{ color: "text.primary" }}>
      <Typography variant="h4">{title}</Typography>
      <Typography>
        Content for {title} will go here. Current mode: {mode}
      </Typography>
    </Box>
  );
};

const OverviewPage = () => <PlaceholderPage title="Overview" />;
const LightingPage = () => <PlaceholderPage title="Lighting" />;
const ClimatePage = () => <PlaceholderPage title="Climate" />;
const EntertainmentPage = () => <PlaceholderPage title="Entertainment" />;
const CommunicationPage = () => <PlaceholderPage title="Communication" />;
function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/communication" />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/lighting" element={<LightingPage />} />
          <Route path="/climate" element={<ClimatePage />} />
          <Route path="/entertainment" element={<EntertainmentPage />} />
          <Route path="/communication" element={<CommunicationPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
