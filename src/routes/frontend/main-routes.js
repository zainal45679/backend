import express from "express"
import { brandRoutes } from "./brand-routes.js";
import { bannerRoutes } from "./banner-routes.js";
import { productRoutes } from "./product-routes.js";
import { categoryRoutes } from "./category-routes.js";
import { authRoutes } from "./auth-routes.js";


export const frontendMainRoutes = express.Router();

frontendMainRoutes.use("/auth", authRoutes)

frontendMainRoutes.use("/banner", bannerRoutes)

frontendMainRoutes.use("/brand", brandRoutes)

frontendMainRoutes.use("/product", productRoutes)

frontendMainRoutes.use("/category", categoryRoutes)

frontendMainRoutes.get("/test", (req, res) => {
  res.send("Frontend route working");
});