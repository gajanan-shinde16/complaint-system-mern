import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection to database failed:", error.message);
    process.exit(1); // for exitting server if connection fails
  }
};

export default connectDB;