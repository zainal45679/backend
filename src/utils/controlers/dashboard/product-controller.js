import mongoose from "mongoose"
import { serverError } from "../../errorHandler.js"
import { statusCode } from "../../statusCode.js"
import { productModel } from "../../models/product-model.js"

export const createProduct = async (req, res, next)=>{

    try {
        const { name, image, description, category, brand, price } = req.body

        if ( !name || !description || !category || !brand || !price){
            return res.status(statusCode.success).json({
                success : false,
                message : "All fields are required"
            })
        }

        await productModel.create({
            name,
            image,
            description,
            category,
            brand,
            price,
        })
        
        return res.status(statusCode.success).json({
            success : true,
            message : "Created successfully"
        })

    } catch (error) {
        console.log(error);
        return next(serverError(error))
    } 
}

export const getAllProduct = async(req, res, next)=>{
    try {
        const products = await productModel.aggregate([
            {
                $match : {
                    deletedAt : null
                },
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
                $lookup : {
                    from : "categories",
                    localField : "category",
                    foreignField : "_id",
                    as : "categoryDetails"
                }
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
                    description : 1,
                    brand : 1,
                    category : 1,
                    price : 1,
                    brandDetails: 1,
                    categoryDetails: 1,
                }
            }
        ])

        return res.status(statusCode.success).json({
            success : true,
            message : "Fetched successfully",
            data : {
                products
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}

export const getOneProduct = async(req, res, next)=> {

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
        
        const product = await productModel.aggregate([
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(id)
                },
            },
            {
                $lookup: {
                    from: "brands",
                    pipeline: [
                    {
                        $match: {
                            deletedAt: null,
                        }    
                    },
                    {
                        $project: {
                            _id: 0,
                            name : 1,
                            description: 1,
                        }
                    }
                    ],
                    localField : "brand",
                    foreignField : "_id",
                    as: "brandDetails"
                }
            },
            {
                $unwind: {
                    path: "$brandDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup : {
                    from : "categories",
                    pipeline: [
                    {
                        $match: {
                            deletedAt: null,
                        }    
                    },
                    {
                        $project: {
                            _id: 0,
                            name : 1,
                            description: 1,
                        }
                    }
                    ],
                    localField : "category",
                    foreignField : "_id",
                    as : "categoryDetails"
                }
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
                    description : 1,
                    brand : 1,
                    category : 1,
                    price : 1,
                    brandDetails: 1,
                    categoryDetails: 1,
                }
            }
        ])


        console.log(product);
        if(!product){
            return res.status(statusCode.success).json({
                success : false,
                message : "id not found"
            })
        }

        return res.status(statusCode.success).json({
            success : true,
            message : "Fetched successfully",
            data : {
                product
            }
        })

    } catch (error) {
        return next(serverError(error))
    }
}

export const updateProductData = async(req, res, next)=>{
    try {
        const {id} = req.params;

        const {name, image, description, brand, category, price} = req.body;

        const isValid = mongoose.Types.ObjectId.isValid(id);

        if(!isValid){
            return res.status(statusCode.success).json({
                success : false,
                message : "Invalid ID"
            })
        }

        const dataToUpdate = await productModel.findOne({ _id : id })

        console.log(dataToUpdate);
        
        console.log(!dataToUpdate);

        if(!dataToUpdate){
            return res.status(statusCode.success).json({
                success : false,
                message : "Data not found"
            })
        }

        if( !name || !description || !brand || !category){
            return res.status(statusCode.success).json({
                success : true,
                message : "All fields are required"
            })
        }

        dataToUpdate.name = name
        dataToUpdate.image = image
        dataToUpdate.description = description
        dataToUpdate.brand = brand
        dataToUpdate.category = category
        dataToUpdate.price = price

        await dataToUpdate.save()

        return res.status(statusCode.success).json({
            success : true,
            message : "Data updated Successfully"
        })
    } catch (error) {
        return next(serverError(error))
    }
}

export const deleteProductData = async (req, res, next)=>{
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

        const dataToDelete = await productModel.findOne({_id: id})

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