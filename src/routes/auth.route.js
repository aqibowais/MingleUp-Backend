import express from "express"
import { handleUserLogin, handleUserLogout, handleUserSignup,handleUpdateProfileImage, checkAuth } from "../controllers/auth.controller.js"
import {protectRoute} from "../middlewares/auth.middleware.js"

const route = express.Router()


route.post("/signup",handleUserSignup)
route.post("/login",handleUserLogin)
route.post("/logout",handleUserLogout)

route.post("/update-profile",protectRoute,handleUpdateProfileImage)

route.get("/check",protectRoute,checkAuth) //for checking auth on refreshing pages etc

export default route