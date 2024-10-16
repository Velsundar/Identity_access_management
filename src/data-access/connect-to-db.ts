const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
    });
    console.log("Successfully connected to MongoDB");
  } catch (err: any) {
    console.log(err);
    process.exit(1);
  }
};
