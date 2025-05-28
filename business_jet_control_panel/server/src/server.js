import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";

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
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
