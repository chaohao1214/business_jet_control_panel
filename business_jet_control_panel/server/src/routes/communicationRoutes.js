import express from "express";
import {
  getCurrentWifiStatus,
  getCurrentSatellitePhoneStatus,
} from "../controllers/communicationController.js";

const router = express.Router();

router.get("/wifi", getCurrentWifiStatus);
router.get("/satellite-phone", getCurrentSatellitePhoneStatus);

// TODO more router later on

export default router;
