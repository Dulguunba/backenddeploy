import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("connected to database");
  } catch (error) {
    console.error("error", error);
  }
};
