import express from "express";
import {
  getCurrentWifiStatus,
  getCurrentSatellitePhoneStatus,
  getCurrentIntercomStatus,
  handleIntercomCall,
} from "../controllers/communicationController.js";

const router = express.Router();

// Wi-Fi Routes
router.get("/wifi", getCurrentWifiStatus);

// Satellite Phone Routes
router.get("/satellite-phone", getCurrentSatellitePhoneStatus);

// intercom routers
router.get("/intercom", getCurrentIntercomStatus);
router.post("/intercom/call", handleIntercomCall);
// TODO more router later on

export default router;
