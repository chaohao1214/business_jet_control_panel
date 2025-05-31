import React, { useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import {
  getIntercomStatus,
  getSatellitePhoneStatus,
  getWifiStatus,
  initiateIntercomCall,
} from "../../services/communicationService";
import StatusItem from "../../components/StatusItem";
import useApiFetcher from "../../hooks/useApiFetcher";

const CommunicationPage = () => {
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
    entityName: "Satellite Phone ",
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
      const response = await initiateIntercomCall({ destination: "Pilot" });
      console.log("Intercom call response:", response);
      fetchIntercomData();
    } catch (error) {
      console.error("Failed to initiate intercom call", error);
    }
  };
  const renderSection = ({ title, loading, error, data, renderItems }) => {
    if (loading)
      return (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      );
    if (error)
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      );
    if (!data)
      return (
        <Typography
          sx={{ mt: 2, color: "text.secondary" }}
        >{`No ${title} data available.`}</Typography>
      );
    return (
      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: "background.paper" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <List dense>{renderItems(data)}</List>
        {title === "Intercom" && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleCallIntercom}>
              Call
            </Button>
          </Box>
        )}
      </Paper>
    );
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "text.primary", fontWeight: "bold" }}
      >
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
