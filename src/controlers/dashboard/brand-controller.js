import mongoose from "mongoose"
import { brandModel } from "../../models/brand-model.js"
import { statusCode } from "../../utils/statusCode.js"
import { serverError } from "../../utils/errorHandler.js"

export const createBrand = async (req, res, next)=>{

    try {
        const { name, image, description} = req.body

        if ( !name || !description){
            return res.status(statusCode.success).json({
                success : false,
                message : "All fields are required"
            })
        }

        await brandModel.create({
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

export const getOneBrand = async(req, res, next)=> {

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
        
        const brand = await brandModel.aggregate([
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
                brand
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}

export const updateBrandData = async(req, res, next)=>{
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

        const dataToUpdate = await brandModel.findOne({ _id : id })

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

export const deleteBrandData = async (req, res, next)=>{
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

        const dataToDelete = await brandModel.findOne({_id: id})

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