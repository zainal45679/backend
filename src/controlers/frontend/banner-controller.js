import { bannerModel } from "../../models/banner-model.js";
import { serverError } from "../../utils/errorHandler.js";
import { statusCode } from "../../utils/statusCode.js";

export const getAllBanner = async(req, res, next)=>{
    try {
        console.log("hello");
        const banners = await bannerModel.aggregate([
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
        console.log("test", banners);

        return res.status(statusCode.success).json({
            success : true,
            message : "Fetched successfully",
            data : {
                banners
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}