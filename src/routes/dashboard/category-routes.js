import express from "express"
import { createCategory, deleteCategoryData, getAllCategory, getOneCategory, updateCategoryData } from "../../controlers/dashboard/category-controller.js"
import { uploadImageFile } from "../../utils/fileUploader.js"

export const categoryRoutes = express.Router()
categoryRoutes.post("/create", uploadImageFile("Brands").single("imageFile"), createCategory)

categoryRoutes.get("/view", getAllCategory)

categoryRoutes.get("/view-one/:id", getOneCategory)

categoryRoutes.put("/update/:id", uploadImageFile("Brands").single("imageFile"), updateCategoryData)

categoryRoutes.post("/delete/:id",deleteCategoryData )
