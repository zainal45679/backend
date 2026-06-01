import express from "express"
import { createFeaturedProduct, createProduct, deleteProductData, getAllProduct, getOneProduct, updateProductData } from "../../controlers/dashboard/product-controller.js"
import { uploadImageFile } from "../../utils/fileUploader.js"
import { getAllFeaturedProduct } from "../../controlers/frontend/product-controller.js"



export const productRoutes = express.Router()

productRoutes.post("/create", uploadImageFile("Brands").single("imageFile"), createProduct)

productRoutes.get("/view", getAllProduct)

productRoutes.get("/view-one/:id", getOneProduct)

productRoutes.put("/update/:id", uploadImageFile("Brands").single("imageFile"), updateProductData)

productRoutes.post("/delete/:id",deleteProductData)

productRoutes.post("/featured/:id",createFeaturedProduct)


