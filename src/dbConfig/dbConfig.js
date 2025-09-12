import mongoose from "mongoose";

// mongoose.set("strictQuery", true);

// const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URL) {
//       throw new Error("MONGO_URL is missing in environment variables");
//     }

//     await mongoose.connect(process.env.MONGO_URL, {
//       serverSelectionTimeoutMS: 5000,
//       maxPoolSize: 10,
//     });

//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       console.log("✅ MongoDB connection established successfully");
//     });

//     connection.on("error", (err) => {
//       console.error("❌ MongoDB connection error:", err);
//     });

//     connection.on("disconnected", () => {
//       console.warn("⚠️ MongoDB disconnected");
//     });

//     process.on("SIGINT", async () => {
//       await mongoose.connection.close();
//       console.log("🔴 MongoDB connection closed due to app termination");
//       process.exit(0);
//     });

//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error);
//     process.exit(1);
//   }
// };

 const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    process.exit(1);
  }
};

export default connectDB;
