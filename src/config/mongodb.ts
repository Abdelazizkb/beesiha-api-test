import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/beesiha-test";

const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl).then(() => {
      console.log("Database connection established!!");
    });
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectDb, 5000);
  }
};

export default connectDb;
