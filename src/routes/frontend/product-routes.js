import express from "express"
import { getProductByCategory } from "../../controlers/frontend/product-controller.js"

export const productRoutes = express.Router()

productRoutes.get("/view-one/:categoryId", getProductByCategory)
