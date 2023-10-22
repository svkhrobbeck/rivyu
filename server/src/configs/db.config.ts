import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const response = await connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected to: ${response.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
