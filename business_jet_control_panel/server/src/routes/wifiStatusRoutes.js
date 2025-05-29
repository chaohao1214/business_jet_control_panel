import express from "express";
import { getCurrentWifiStatus } from "../controllers/wifiStatusController.js";

const router = express.Router();

router.get("/", getCurrentWifiStatus);

// TODO more router later on

export default router;
