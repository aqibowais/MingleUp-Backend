import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.connection.js";

import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl = process.env.MONGOURI || "";

//middlewares
app.use(express.json({ limit: '10mb' })) // Increase payload limit to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))


//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
  connectDB(dbUrl)

});
