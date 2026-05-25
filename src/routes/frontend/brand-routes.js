import express from "express"
import { getAllBanner } from "../../controlers/frontend/banner-controller.js"

export const brandRoutes = express.Router()

brandRoutes.get("/view", getAllBanner)
