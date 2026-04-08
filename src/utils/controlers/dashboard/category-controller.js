import mongoose from "mongoose"
import { serverError } from "../../errorHandler.js"
import categoryModel from "../../models/category-model.js"
import { statusCode } from "../../statusCode.js"

export const createCategory = async (req, res, next)=>{

    try {
        const { name, image, description} = req.body

        if ( !name || !image || !description){
            return res.status(statusCode.validationError).json({
                success : false,
                message : "All fields are required"
            })
        }

        await categoryModel.create({
            name : name,
            image : image,
            description : description
        })
        
        return res.status(statusCode.success).json({
            success : true,
            message : "Created successfully"
        })

    } catch (error) {
        return next(serverError(error))
    } 
}

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
                categories
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}

export const getOneCategory = async(req, res, next)=> {

    try {
        console.log(req.params);
        const {id} = req.params

      
        
        const category = await categoryModel.aggregate([
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(id)
                }
            }
        ])

        return res.status(statusCode.success).json({
            success : true,
            message : "Fetched successfully",
            data : {
                category
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}