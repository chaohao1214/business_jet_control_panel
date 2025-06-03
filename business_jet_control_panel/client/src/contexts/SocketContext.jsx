import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    console.log(
      `[Socket.IO Client] Attempting to connect to: ${SOCKET_SERVER_URL}`
    );
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(
        `[Socket.IO Client] connected to server. Socket ID:`,
        newSocket.id
      );
    });

    newSocket.on("disconnect", (reason) => {
      console.log(
        "[Socket.IO Client] Disconnected from server. Reason:",
        reason
      );
      if (reason === "io server disconnect") {
        newSocket.connect();
      }
    });
    newSocket.on("connect_error", (error) => {
      console.error("[Socket.IO Client] Connection Error:", error);
    });

    newSocket.on("message", (data) => {
      console.error("[Socket.IO Client] message from server:", data);
    });

    return () => {
      if (newSocket) {
        console.log("[Socket.IO Client] Disconnecting socket...");
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
