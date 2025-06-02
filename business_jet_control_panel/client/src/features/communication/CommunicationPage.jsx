// CommunicationPage.jsx
import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import {
  getIntercomStatus,
  getSatellitePhoneStatus,
  getWifiStatus,
  initiateIntercomCall,
} from "../../services/communicationService";
import StatusItem from "../../components/StatusItem";
import useApiFetcher from "../../hooks/useApiFetcher";
import { useSnackbar } from "notistack";

const CommunicationPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    data: wifiStatus,
    loading: loadingWifi,
    error: errorWifi,
    fetchData: fetchWifiData,
  } = useApiFetcher({
    apiCallFunction: getWifiStatus,
    entityName: "Wifi-Status",
  });

  const {
    data: satelliteStatus,
    loading: loadingSatellite,
    error: errorSatellite,
    fetchData: fetchSatelliteData,
  } = useApiFetcher({
    apiCallFunction: getSatellitePhoneStatus,
    entityName: "Satellite Phone",
  });

  const {
    data: intercomStatus,
    loading: loadingIntercom,
    error: errorIntercom,
    fetchData: fetchIntercomData,
  } = useApiFetcher({
    apiCallFunction: getIntercomStatus,
    entityName: "Intercom Status",
  });

  useEffect(() => {
    fetchWifiData();
    fetchSatelliteData();
    fetchIntercomData();
  }, [fetchWifiData, fetchSatelliteData, fetchIntercomData]);

  const handleCallIntercom = async () => {
    try {
      const response = await initiateIntercomCall({ destination: "office" });
      if (response && response.message === "Intercom call initiated.") {
        enqueueSnackbar("Intercom call initiated succesfull!", {
          variant: "success",
        });
        fetchIntercomData();
      }
    } catch (error) {
      console.error("Failed to initiate intercom call", error);
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  };

  const renderSection = ({
    title,
    loading,
    error,
    data,
    renderItems,
    showCallButton,
  }) => {
    return (
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          p: { xs: 2, sm: 3 },
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !data ? (
          <Typography color="text.secondary">
            No {title} data available.
          </Typography>
        ) : (
          <Box>
            {renderItems(data)}
            {showCallButton && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" onClick={handleCallIntercom}>
                  Call
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: { xs: 2, sm: 4 },
        py: 3,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Communication
      </Typography>

      {renderSection({
        title: "Wi-Fi",
        loading: loadingWifi,
        error: errorWifi,
        data: wifiStatus,
        renderItems: (data) => (
          <>
            <StatusItem label="Status" value={data.status} />
            <StatusItem label="Frequency" value={data.frequency} />
            <StatusItem label="IP Address" value={data.ipAddress} />
            <StatusItem label="Subnet Mask" value={data.subnetMask} />
            <StatusItem label="Signal Strength" value={data.signalStrength} />
            {data.networkName && (
              <StatusItem label="Network Name" value={data.networkName} />
            )}
          </>
        ),
      })}

      {renderSection({
        title: "Satellite Phone",
        loading: loadingSatellite,
        error: errorSatellite,
        data: satelliteStatus,
        renderItems: (data) => (
          <>
            <StatusItem label="Status" value={data.status} />
            <StatusItem label="Number" value={data.phoneNumber} />
            <StatusItem label="Signal Strength" value={data.signalStrength} />
          </>
        ),
      })}

      {renderSection({
        title: "Intercom",
        loading: loadingIntercom,
        error: errorIntercom,
        data: intercomStatus,
        showCallButton: true,
        renderItems: (data) => (
          <>
            <StatusItem label="Status" value={data.status} />
            <StatusItem
              label="Current Destination"
              value={data.currentDestination}
            />
            {data.lastCallTo && (
              <StatusItem label="Last Call To" value={data.lastCallTo} />
            )}
            {data.lastCallTime && (
              <StatusItem
                label="Last Call Time"
                value={new Date(data.lastCallTime).toLocaleString()}
              />
            )}
          </>
        ),
      })}
    </Box>
  );
};

export default CommunicationPage;
