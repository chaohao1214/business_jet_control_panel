import WifiStatus from "../models/WifiStatus.js";

/**
 * @description get the current wifi status
 * @route get /api/wifi-status
 * @access Public
 */

export const getCurrentWifiStatus = async (req, res) => {
  try {
    const status = await WifiStatus.findOne({}); // Get the most recently updated document
    if (status) {
      res.status(200).json(status);
    } else {
      res
        .status(200)
        .json({ message: "No Wi-Fi status data available yet.", data: null });
    }
  } catch (error) {
    console.error("Error fetching wifi status:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching Wi-Fi status" });
  }
};

// TODO: Add more controller functions later
