import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    // Print the REAL per-server reason (hidden inside error.reason.servers)
    if (error.reason && error.reason.servers) {
      console.error("---- PER-SERVER ERRORS ----");
      for (const [host, desc] of error.reason.servers) {
        console.error(host, "=>", desc.error);
      }
      console.error("----------------------------");
    }
    process.exit(1);
  }
};

export default connectDB;