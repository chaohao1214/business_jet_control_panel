import WifiStatus from "../models/WifiStatus.js";
import SatellitePhoneStatus from "../models/SatellitePhoneStatus.js";
import IntercomStatus from "../models/IntercomStatus.js";
import { emitIntercomStatusUpdate } from "../../services/socketManager.js";
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
  const callTime = new Date();
  try {
    const query = {};
    const update = {
      status: "Calling",
      currentDestination: destination || "Cabin Crew",
      lastCallTo: destination || "Cabin Crew",
      lastCallTime: callTime,
    };
    const options = {
      upsert: true,
      new: true,
      runValidators: true,
    };
    const updatedIntercomStatus = await IntercomStatus.findOneAndUpdate(
      query,
      update,
      options
    );
    if (!updatedIntercomStatus) {
      console.error(
        "[Controller] findOneAndUpdate returned null even with upsert."
      );
      return res
        .status(404)
        .json({ message: "Could not update or create Intercom status." });
    }

    emitIntercomStatusUpdate(updatedIntercomStatus);
    res.status(200).json({
      message: "Intercom call initiated.",
      data: updatedIntercomStatus,
    });
  } catch (error) {
    console.error(
      "[Controller] Error handling Intercom call:",
      error.message,
      error.stack
    );
    res
      .status(500)
      .json({ message: "Server error while handling Intercom call" });
  }
};
