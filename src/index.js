import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.connection.js";
import path from "path"
import dotenv from "dotenv";
import { app, server } from "./lib/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;
const dbUrl = process.env.MONGOURI || "";
const _dirName = path.resolve()
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
app.use("/api/messages", messageRoutes);

//if we are in production then server frontend as static 
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(_dirName,"../MingleUp-Frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirName,"../MingleUp-Frontend","dist","index.html"))
  })
}

server.listen(port, () => {
  console.log(`server is running on port : ${port}`);
  connectDB(dbUrl)

});
