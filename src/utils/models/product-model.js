import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    brand : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    deletedAt : {
        type : Date,
        default : null
    }
}, { timestamps : true })

export const productModel = mongoose.model("Products", productModelSchema)