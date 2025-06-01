import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StatusItem = ({ label, value }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmall ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isSmall ? "flex-start" : "center",
        px: 2,
        py: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.primary", fontWeight: 500, mt: isSmall ? 0.5 : 0 }}
      >
        {value || "N/A"}
      </Typography>
    </Box>
  );
};

export default StatusItem;
