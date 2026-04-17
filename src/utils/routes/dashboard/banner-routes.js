import express from "express"
import { createBanner, deleteBannerData, getAllBanner, getOneBanner, updateBannerData } from "../../controlers/dashboard/banner-controller.js"

export const bannerRoutes = express.Router()
bannerRoutes.post("/create", createBanner)

bannerRoutes.get("/view", getAllBanner)

bannerRoutes.get("/view-one/:id", getOneBanner)

bannerRoutes.put("/update/:id", updateBannerData)

bannerRoutes.post("/delete/:id",deleteBannerData )
