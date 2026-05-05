import express from "express"
import { createProduct, deleteProductData, getAllProduct, getOneProduct, updateProductData } from "../../controlers/dashboard/product-controller.js"


export const productRoutes = express.Router()

productRoutes.post("/create", createProduct)

productRoutes.get("/view", getAllProduct)

productRoutes.get("/view-one/:id", getOneProduct)

productRoutes.put("/update/:id", updateProductData)

productRoutes.post("/delete/:id",deleteProductData)
