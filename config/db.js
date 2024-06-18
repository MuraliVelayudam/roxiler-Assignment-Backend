import mongoose from "mongoose";
import { configuration } from "./config.js";

const mongoDb = configuration.db;

export const connectToDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`Successfully connected to DB`);
    });

    await mongoose.connect(mongoDb);
  } catch (error) {
    console.log(`Failed to connected to DB`, error);
    process.exit(1);
  }
};
