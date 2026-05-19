import express from "express"
import { getAllBanner } from "../../controlers/frontend/banner-controller.js"

export const bannerRoutes = express.Router()

bannerRoutes.get("/view", getAllBanner)
