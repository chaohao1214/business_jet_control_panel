import mongoose from "mongoose";

const intercomStatusSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["Available", "Busy", "Calling", "Ringing", "Offline", "Disabled"],
      default: "Available",
    },
    currentDestination: {
      type: String,
      trim: true,
      default: "Cabin Crew",
    },
    lastCallTo: {
      type: String,
      trim: true,
    },
    lastCallTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const IntercomStatus = mongoose.model("IntercomStatus", intercomStatusSchema);

export default IntercomStatus;
