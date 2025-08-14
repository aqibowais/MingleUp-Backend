import express from "express"
import {protectRoute} from "../middlewares/auth.middleware.js"
import { getUsers,getMessages, sendMessage } from "../controllers/message.controller.js"

const route = express.Router()

route.get("/users",protectRoute,getUsers)
route.get("/:id",protectRoute,getMessages)

route.post("/send/:id",protectRoute,sendMessage)

export default route