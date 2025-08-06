import mongoose from "mongoose";
export const connectDB = async (dbUrl) => {
  try {
    await mongoose
      .connect(dbUrl)
      .then((conn) =>
        console.log(`mongodb connected with : ${conn.connection.host}`)
      );
  } catch (error) {
    console.log(`[Error]: ${error}`);
  }
};
