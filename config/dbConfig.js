import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Database Connected Successfully ✅".bgGreen.black);
  } catch (error) {
    console.log(" MongoDb Connection Failed ❌", error.message.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;
