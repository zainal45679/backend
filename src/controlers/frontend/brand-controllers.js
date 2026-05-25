import { brandModel } from "../../models/brand-model"
import { serverError } from "../../utils/errorHandler"
import { statusCode } from "../../utils/statusCode"

export const getAllBrands = async(req, res, next)=>{
    try {
        const brands = await brandModel.aggregate([
            {
                $match : {
                    deletedAt : null
                },
            },
            {
                $sort : {
                    createdAt : -1
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
                brands
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}