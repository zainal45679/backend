import express from "express"
import { categoryRoutes } from "./category-routes.js";
import { bannerRoutes } from "./banner-routes.js";
import { brandRoutes } from "./brand-routes.js";
import { productRoutes } from "./product-routes.js";

export const dashboardMainRoutes = express.Router();

dashboardMainRoutes.use("/category", categoryRoutes)

dashboardMainRoutes.use("/banner", bannerRoutes)

dashboardMainRoutes.use("/brand", brandRoutes)

dashboardMainRoutes.use("/product", productRoutes)

