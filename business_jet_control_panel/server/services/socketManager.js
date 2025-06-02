let io = null;
/**
 * Initializes the socket manager with the Socket.IO server instance.
 * This function should be called once when the server starts.
 */
export const initSocketManager = (socketInstance) => {
  io = socketInstance;
  console.log("[SocketManager] Socket.IO instance initialized in manager.");
};

/**
 * Emits an intercom status update to all connected clients.
 * @param {object} data - The intercom status data to send.
 */

export const emitIntercomStatusUpdate = (data) => {
  if (io) {
    io.emit("intercomStatusUpdate", data);
    console.log("SocketManager Emitted intercomStatusUpdate: ", data);
  } else {
    console.warn(
      "SocketManager instance not initialized. Cannot emit intercomStatusUpdate."
    );
  }
};

/**
 * Emits a Wi-Fi status update to all connected clients.
 * @param {object} data - The Wi-Fi status data to send.
 */

export const emitWifiStatusUpdate = (data) => {
  if (io) {
    io.emit("wifiStatusUpdate", data); // Event name for Wi-Fi updates
    console.log("SocketManager Emitted wifiStatusUpdate:", data);
  } else {
    console.warn(
      "SocketManager IO instance not initialized. Cannot emit wifiStatusUpdate."
    );
  }
};

/**
 * Emits a Satellite Phone status update to all connected clients.
 * @param {object} data - The Satellite Phone status data to send.
 */
export const emitSatellitePhoneStatusUpdate = (data) => {
  if (io) {
    io.emit("satellitePhoneStatusUpdate", data);
    console.log("SocketManager Emitted satellitePhoneStatusUpdate:", data);
  } else {
    console.warn(
      "SocketManager IO instance not initialized. Cannot emit satellitePhoneStatusUpdate."
    );
  }
};
