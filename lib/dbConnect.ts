import mongoose from "mongoose";

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (e) {
    console.error(e);
  }
}

export default dbConnection;
