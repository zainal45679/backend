import express from "express"
import { createBrand, deleteBrandData, getAllBrands, getOneBrand, updateBrandData } from "../../controlers/dashboard/brand-controller.js"
import { uploadImageFile } from "../../utils/fileUploader.js"

export const brandRoutes = express.Router()
brandRoutes.post("/create", uploadImageFile("Brands").single("imageFile"), createBrand)

brandRoutes.get("/view", getAllBrands)

brandRoutes.get("/view-one/:id", getOneBrand)

brandRoutes.put("/update/:id", uploadImageFile("Brands").single("imageFile"), updateBrandData)

brandRoutes.post("/delete/:id",deleteBrandData )
