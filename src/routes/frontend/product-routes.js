import express from "express"
import { getAllFeaturedProduct, getProductByCategory, getProductById } from "../../controlers/frontend/product-controller.js"

export const productRoutes = express.Router()

productRoutes.get("/category/:categoryId", getProductByCategory)

productRoutes.get("/view-one/:productId", getProductById)

productRoutes.get("/featured/view", getAllFeaturedProduct)

