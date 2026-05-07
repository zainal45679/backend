import env from "../../../env.js"
import { adminModel } from "../../models/admin-model.js"
import { serverError } from "../../utils/errorHandler.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { statusCode } from "../../utils/statusCode.js"

export const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if( !email || !password){
           return res.status(statusCode.success).json({
                success : false,
                message : "All fields are required"
            }) 
        }

        const admin = await adminModel.findOne({ email })

        if( !admin ){
           return res.status(statusCode.success).json({
                success : false,
                message : "Email not found"
            }) 
        }

        const isValid = await bcrypt.compare(password, admin.password)
        const accessToken = await jwt.sign({email}, env.ADMIN_JWT_SECRET_KEY)

        if(!isValid){
            return res.status(statusCode.success).json({
                success : false,
                message : "Incorrect Password"
            })
        }else{
            return res.status(statusCode.success).json({
                success : true,
                message : "Login successful",
                data : {
                    accessToken
                }
            })
        }

    } catch (error) {
        console.log( "Server error ", error)
        return next (serverError())
    }
} 