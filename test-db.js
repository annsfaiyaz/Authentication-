import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "mydatabase",
    });
    console.log("✅ Connected to MongoDB:", conn.connection.host);
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  }
}

testConnection();
