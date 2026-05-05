import mongoose from "mongoose"
import { serverError } from "../../errorHandler.js"
import { statusCode } from "../../statusCode.js"
import { bannerModel } from "../../models/banner-model.js"

export const createBanner = async (req, res, next)=>{

    try {
        const { name, image, description} = req.body

        if ( !name || !description){
            return res.status(statusCode.success).json({
                success : false,
                message : "All fields are required"
            })
        }

        await bannerModel.create({
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

export const getOneBanner = async(req, res, next)=> {

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
        
        const banner = await bannerModel.aggregate([
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(id)
                }
            }
        ])


        console.log(banner);
        if(!banner){
            return res.status(statusCode.success).json({
                success : false,
                message : "id not found"
            })
        }

        return res.status(statusCode.success).json({
            success : true,
            message : "Fetched successfully",
            data : {
                banner
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}

export const updateBannerData = async(req, res, next)=>{
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

        const dataToUpdate = await bannerModel.findOne({ _id : id })

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

export const deleteBannerData = async (req, res, next)=>{
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

        const dataToDelete = await bannerModel.findOne({_id: id})

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