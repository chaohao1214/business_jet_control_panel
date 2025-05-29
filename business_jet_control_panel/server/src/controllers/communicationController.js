import WifiStatus from "../models/WifiStatus.js";
import SatellitePhoneStatus from "../models/SatellitePhoneStatus.js";
/**
 * @description get the current wifi status
 * @route GET /api/communication/wifi
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

/**
 * @desc    Get the current Satellite Phone status
 * @route   GET /api/communication/satellite-phone
 * @access  Public
 */

export const getCurrentSatellitePhoneStatus = async (req, res) => {
  try {
    const status = await SatellitePhoneStatus.findOne({});
    if (status) {
      res.status(200).json(status);
    } else {
      res
        .status(200)
        .json({
          message: "No Satellite Phone status data available yet.",
          data: null,
        });
    }
  } catch (error) {
    console.error("Error fetching satellite status:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching Satellite Phone status" });
  }
};
// TODO: Add more controller functions later
