import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./auth.route.js";
import { connectDB } from "./lib/db.connection.js";

import dotenv from "dotenv";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl = process.env.MONGOURI || "";

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
  connectDB(dbUrl)

});
