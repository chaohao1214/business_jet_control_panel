// client/src/components/StatusItem.jsx
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const StatusItem = ({ label, value, subValue }) => {
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 1.5, // Padding top and bottom
        alignItems: "center",
      }}
    >
      <ListItemText
        primary={label}
        secondary={subValue || null}
        sx={
          {
            /* flexGrow: 1, // Allow label part to take more space if needed, but space-between should handle distribution */
          }
        }
      />
      <Typography
        variant="body1"
        sx={{
          color: "text.primary",
          // textAlign: 'right', // Not strictly needed if ListItem uses space-between and this is the last item
          ml: 2, // Add some margin to ensure separation from the label part
        }}
      >
        {/* Ensure value is a string or primitive for Typography to render */}
        {value !== undefined && value !== null && value !== ""
          ? String(value)
          : "N/A"}
      </Typography>
    </ListItem>
  );
};

export default StatusItem;
