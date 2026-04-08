import categoryModel from "../../models/category-model"
import { statusCode } from "../../statusCode"

export const createCategory = async (req, res, next) => {
    try {
        const {name, image, description} = req.body
        
        await categoryModel.create ({
            name : name,
            image : image,
            description : description
        })

        return res.status(statusCode.success).json({
            success : true,
            message : "Category created successfully"
        })

    } catch (error) {
        return 
    }
}