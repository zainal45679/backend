import mongoose from "mongoose"

const adminModelSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : false
    },
    deletedAt : {
        type : Date,
        default : null
    }
}, { timestamps : true })

export const adminModel = mongoose.model("admins", adminModelSchema)