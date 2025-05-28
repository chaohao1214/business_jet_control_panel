import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("Attempting to connect with MONGODB_URI:", process.env.MONGODB_URL); // <--- Add this line
const connnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connnectDB;
