import express from "express"
import { createProduct, deleteProductData, getAllProduct, getOneProduct, updateProductData } from "../../controlers/dashboard/product-controller.js"
import { uploadImageFile } from "../../utils/fileUploader.js"


export const productRoutes = express.Router()

productRoutes.post("/create", uploadImageFile("Brands").single("imageFile"), createProduct)

productRoutes.get("/view", getAllProduct)

productRoutes.get("/view-one/:id", getOneProduct)

productRoutes.put("/update/:id", uploadImageFile("Brands").single("imageFile"), updateProductData)

productRoutes.post("/delete/:id",deleteProductData)
