import express from "express"
import { createBrand, deleteBrandData, getAllBrands, getOneBrand, updateBrandData } from "../../controlers/dashboard/brand-controller.js"

export const brandRoutes = express.Router()
brandRoutes.post("/create", createBrand)

brandRoutes.get("/view", getAllBrands)

brandRoutes.get("/view-one/:id", getOneBrand)

brandRoutes.put("/update/:id", updateBrandData)

brandRoutes.post("/delete/:id",deleteBrandData )
