import { categoryModel } from "../../models/category-model.js"
import { serverError } from "../../utils/errorHandler.js"
import { statusCode } from "../../utils/statusCode.js"

export const getAllCategory = async(req, res, next)=>{
    try {
        const categories = await categoryModel.aggregate([
            {
                $match : {
                    deletedAt : null
                },
            },
            {
                $sort : {
                    createdAt : 1
                },
            },
            {
                $project : {
                    name : 1,
                    image : 1,
                    description : 1
                }
            }
        ])

        return res.status(statusCode.success).json({
            success : true,
            message : "Fetched successfully",
            data : {
                categories
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}