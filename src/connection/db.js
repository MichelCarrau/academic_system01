import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected: ", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
