import WifiStatus from "../models/WifiStatus.js";
import SatellitePhoneStatus from "../models/SatellitePhoneStatus.js";
import IntercomStatus from "../models/IntercomStatus.js";
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
      res.status(200).json({
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

/**
 * @desc    Get the current Intercom status
 * @route   GET /api/communication/intercom
 * @access  Public
 */

export const getCurrentIntercomStatus = async (req, res) => {
  try {
    const status = await IntercomStatus.findOne({}).sort({ updatedAt: -1 });
    if (status) {
      res.status(200).json(status);
    } else {
      res.status(200).json({
        message: "No Intercom status data available yet.",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error fetching intercom status:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching Intercom status" });
  }
};

/**
 * @desc    Handle an Intercom call action
 * @route   POST /api/communication/intercom/call
 * @access  Public
 */

export const handleIntercomCall = async (req, res) => {
  const { destination } = req.body;
  try {
    let intercom = await IntercomStatus.findOne({});
    if (!intercom) {
      console.log(
        "[Controller] No existing IntercomStatus found, creating a new one for the call."
      );
    } else {
      // update existing call
      intercom.status = "Calling";
    }
    intercom = new IntercomStatus({
      status: "Calling",
      currentDestination: destination || "Cabin Crew",
      lastCallTo: destination || "Cabin Crew",
      lastCallTime: new Date(),
    });

    const updateIntercomStatus = await intercom.save();
    // if we have mqtt msg, we may also need to update the status change, public a topic here
    res.status(200).json({
      message: "Intercom call initiated.",
      data: updateIntercomStatus,
    });
  } catch (error) {}
};
