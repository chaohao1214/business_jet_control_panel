import mongoose from "mongoose";

const satellitePhoneStatusSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["Connected", "Disconnected", "Calling", "Unavailable", "Disabled"],
      default: "Unavailable",
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    signalStrength: {
      type: String,
      trim: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const SatellitePhoneStatus = mongoose.model(
  "SatellitePhoneStatus",
  satellitePhoneStatusSchema
);
export default SatellitePhoneStatus;
