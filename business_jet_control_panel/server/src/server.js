import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import connectDB from "./config/db.js";
import communicationRoutes from "./routes/communicationRoutes.js";
import { initSocketManager } from "../services/socketManager.js";
// Determine the __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });
//connect to mongoDB
connectDB();

// --- Express App Setup ---
const app = express();
//middleware
app.use(cors()); // enable cors for all routes
app.use(express.json());

// --- HTTP Server Setup for Express and Socket.IO
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // need react url for production
    methods: ["GET", "POST"],
  },
});

initSocketManager(io);

io.on("connection", (socket) => {
  console.log(`[Socket.IO] New client connected: ${socket.id}`);
  socket.emit("message", {
    text: `Welcome! You are connected with ID: ${socket.id}`,
  });
  socket.on("disconnect", () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
  });
});
app.get("/", (req, res) => {
  res.send("API is running...");
});

// TODO: Add API routes later
app.use("/api/communication", communicationRoutes);

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
  console.log(`Socket.IO server initialized and listening.`);
});
