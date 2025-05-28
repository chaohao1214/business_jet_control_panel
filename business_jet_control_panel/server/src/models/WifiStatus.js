import mongoose from "mongoose";

const wifiStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      require: true,
      enum: ["Connected", "Disconnected", "Scanning", "Error", "Disabled"],
      default: "Disconnected",
    },
    networkName: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      trim: true,
      // match: [/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Please fill a valid IP address'],
    },
    subnetMask: {
      type: String,
      trim: true,
      // match: [/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
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
  {
    timestamps: true, //
  }
);

wifiStatusSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.lastUpdated = Date.now();
  }
  next();
});

const WifiStatus = mongoose.model("WifiStatus", wifiStatusSchema);
export default WifiStatus;
