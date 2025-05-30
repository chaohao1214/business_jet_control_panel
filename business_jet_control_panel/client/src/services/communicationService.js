import axios from "axios";
const API_BASE_URL = "http://localhost:5001/api/communication";

export const getWifiStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wifi`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Wi-Fi status:",
      error.response ? error.response.data : error.message
    );
  }
};

export const getSatellitePhoneStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/satellite-phone`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Satellite Phone status:",
      error.response ? error.response.data : error.message
    );
  }
};

export const getIntercomStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/intercom`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Intercom status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const initiateIntercomCall = async (callDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/intercom/call`,
      callDetails
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error initiating Intercom call:",
      error.response ? error.response.data : error.message
    );
  }
};
