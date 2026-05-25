import express from "express"
import { brandRoutes } from "./brand-routes.js";
import { bannerRoutes } from "./banner-routes.js";
import { productRoutes } from "./product-routes.js";

export const frontendMainRoutes = express.Router();

frontendMainRoutes.use("/banner", bannerRoutes)

frontendMainRoutes.use("/brand", brandRoutes)

frontendMainRoutes.use("/product", productRoutes)
