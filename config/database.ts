import mongoose, { ConnectOptions } from "mongoose";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`);
  }
};

export default connectToDB;
