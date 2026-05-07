import express from "express"
import { loginAdmin } from "../../controlers/dashboard/auth-controller.js"

export const authRoutes = express.Router()
authRoutes.post("/login", loginAdmin)