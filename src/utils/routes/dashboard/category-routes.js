import express from "express"
import { createCategory, getAllCategory, getOneCategory } from "../../controlers/dashboard/category-controller.js"

export const categoryRoutes = express.Router()
categoryRoutes.post("/create", createCategory)

categoryRoutes.get("/view", getAllCategory)

categoryRoutes.get("/view-one/:id", getOneCategory)
