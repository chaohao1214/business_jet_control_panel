import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./config/db.js";

import communicationRoutes from "./routes/communicationRoutes.js";

// Determine the __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });
//connect to mongoDB
connectDB();
const app = express();
//middleware
app.use(cors()); // enable cors for all routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// TODO: Add API routes later
app.use("/api/communication", communicationRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
