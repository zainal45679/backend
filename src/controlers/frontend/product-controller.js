import mongoose from "mongoose"
import { productModel } from "../../models/product-model.js"
import { serverError } from "../../utils/errorHandler.js"
import { statusCode } from "../../utils/statusCode.js"

export const getProductByCategory = async (req, res, next) => {
    try {

        const { categoryId } = req.params

        const products = await productModel.aggregate([
            {
                $match: {
                    deletedAt: null,
                    category: new mongoose.Types.ObjectId(categoryId)
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brandDetails"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    name: 1,
                    image: 1,
                    description: 1,
                    brand: 1,
                    category: 1,
                    price: 1,
                    brandDetails: 1,
                    categoryDetails: 1
                }
            }
        ])

        return res.status(statusCode.success).json({
            success: true,
            message: "Fetched successfully",
            data: {
                products
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}
