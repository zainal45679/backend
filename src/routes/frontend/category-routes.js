import express from "express"

import { getAllCategory } from "../../controlers/frontend/category-controller.js"

export const categoryRoutes = express.Router()

categoryRoutes.get("/view", getAllCategory)
