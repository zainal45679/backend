import mongoose from "mongoose"
import { serverError } from "../../errorHandler.js"
import { categoryModel } from "../../models/category-model.js"
import { statusCode } from "../../statusCode.js"

export const createCategory = async (req, res, next)=>{

    try {
        const { name, image, description} = req.body

        if ( !name || !description){
            return res.status(statusCode.success).json({
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

        const {id} = req.params

        const isValid = mongoose.Types.ObjectId.isValid(id)
        console.log(isValid);

        if(!isValid){
            return res.status(statusCode.success).json({
                success : false,
                message : "id not valid"
            })
        }
        
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

export const updateCategoryData = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const {name, image, description} = req.body;

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if(!isValid){
            return res.status(statusCode.success).json({
                success : false,
                message : "Invalid ID"
            })
        }

        const dataToUpdate = await categoryModel.findOne({ _id : id })

        console.log(dataToUpdate);
        
        console.log(!dataToUpdate);

        if(!dataToUpdate){
            return res.status(statusCode.success).json({
                success : false,
                message : "Data not found"
            })
        }
        

        if( !name || !description){
            return res.status(statusCode.success).json({
                success : true,
                message : "All fields are required"
            })
        }

        dataToUpdate.name = name
        dataToUpdate.image = image
        dataToUpdate.description = description

        await dataToUpdate.save()

        return res.status(statusCode.success).json({
            success : true,
            message : "Data updated Successfully"
        })
    } catch (error) {
        return next(serverError(error))
    }
}

export const deleteCategoryData = async (req, res, next)=>{
    try {
        const {id} = req.params;
        console.log(id);
        const isValid = mongoose.Types.ObjectId.isValid(id);

        if(!isValid){
            return res.status(statusCode.success).json({
                success : false,
                message : "Id not found"
            })
        }

        const dataToDelete = await categoryModel.findOne({_id: id})

        if(!dataToDelete){
            return res.status(statusCode.success).json({
                success : false,
                message : "Data not found"
            })
        }

        console.log(dataToDelete);

        dataToDelete.deletedAt = new Date()

        await dataToDelete.save()

        return res.status(statusCode.success).json({
            success : true,
            message : "Data Deleted Successfully"
        })

    } catch (error) {
        return next(serverError(error))
    }
}