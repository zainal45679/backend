"use client"
import jwt from "jsonwebtoken"
import env from "../../env.js";


export const adminMiddleware = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization 

        if(!authHeader){
            return res.status(401).json({
                success : false,
                message : "Access token not found"
            })
        }

        const token = authHeader.split(" ")[1];

        const valid = jwt.verify( token, env.ADMIN_JWT_SECRET_KEY)

        if(!valid){
            return res.status(401).json({
                success : false,
                message : "Access token not valid"
            })
        }

        req.admin = valid;

        next();

    } catch (error) {
        return res.redirect("/login")
    }
}