import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI as string, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
      dbName: "Tasks",
    });
    await mongoose.connection.db?.admin().command({ ping: 1 });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
