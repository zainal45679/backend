import mongoose from "mongoose"

const categoryModelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false,
    },
    deletedAt : {
        type : Date,
        default : null
    }
}, { timestamps : true })

export const categoryModel = mongoose.model("Category", categoryModelSchema)