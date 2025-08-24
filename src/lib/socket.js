import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://mingleup-frontend.onrender.com'],
    credentials: true,
  },
});

export function getRecieverSocketId(userId){
  return onlineUsersMap[userId]
}
const onlineUsersMap = {} //used to store the online users as {userId : socketId}
io.on("connection",(socket)=>{
    console.log("A user is connected - ",socket.id)

    const userId = socket.handshake.query.userId
    if(userId) onlineUsersMap[userId] = socket.id

    //io.emit is used to send events to all the connected users
    io.emit("getOnlineUsers",Object.keys(onlineUsersMap))


    socket.on("disconnect",()=>{
        console.log("A user is disconnected - ",socket.id)
        delete onlineUsersMap[userId]
        io.emit("getOnlineUsers",Object.keys(onlineUsersMap))

    })

})

export {io,app,server}