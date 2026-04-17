import express from "express"
import { createCategory, deleteCategoryData, getAllCategory, getOneCategory, updateCategoryData } from "../../controlers/dashboard/category-controller.js"

export const categoryRoutes = express.Router()
categoryRoutes.post("/create", createCategory)

categoryRoutes.get("/view", getAllCategory)

categoryRoutes.get("/view-one/:id", getOneCategory)

categoryRoutes.put("/update/:id", updateCategoryData)

categoryRoutes.post("/delete/:id",deleteCategoryData )
