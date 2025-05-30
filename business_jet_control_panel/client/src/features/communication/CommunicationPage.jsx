import React from "react";
import { Box, ListItem, ListItemText, Typography } from "@mui/material";
// helper component for displaying key-value pairs

const StatusItem = ({ label, value, subValue }) => {
  <ListItem
    sx={{
      justifyContent: "space-between",
      py: 1.5,
    }}
  >
    <ListItemText primary={label} secondary={subValue || null}>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", textAlign: "right" }}
      >
        {value || "N/A"}
      </Typography>
    </ListItemText>
  </ListItem>;
};

const CommunicationPage = () => {
  const renderWifiSection = () => {};
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "text.primary", fontWeight: "bold" }}
      >
        Communication
      </Typography>
      {renderWifiSection()}

      {/* TODO: Render Satellite Phone Section */}
      {/* TODO: Render Intercom Section (including the Call button) */}
    </Box>
  );
};

export default CommunicationPage;
