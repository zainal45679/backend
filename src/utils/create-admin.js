import env from "../../env.js"
import { adminModel } from "../models/admin-model.js"
import { serverError } from "./errorHandler.js"
import bcrypt from "bcrypt"

export const createAdmin = async (req, res, next)=> {

    const isAdmin = await adminModel.findOne({})

    if(!isAdmin){
        try {
        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync( env.ADMIN_PASS, salt)

        await adminModel.create({
            email : env.ADMIN_EMAIL,
            password : hash
        })

        console.log("Admin created successfully");
            
        } catch (error) {
            console.log( "Server error ", error)
            return next (serverError(error))
        }
    }
}