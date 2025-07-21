import mongoose from "mongoose";
export const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri);
    console.log("MongoDB has been connected");
  } catch (error) {
    console.log("Error to connect to MongoDB", error);
    process.exit(1);
  }
  mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error");
  });
};
