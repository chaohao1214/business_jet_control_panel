import mongoose from "mongoose";

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
