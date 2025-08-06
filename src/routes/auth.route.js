import express from "express"
import { handleUserLogin, handleUserLogout, handleUserSignup } from "../controllers/auth.controller.js"

const route = express.Router()


route.post("/signup",handleUserSignup)
route.post("/login",handleUserLogin)
route.post("/logout",handleUserLogout)

export default route