import { bannerRoutes } from "./banner-routes.js";
import express from "express"

export const frontendMainRoutes = express.Router();

frontendMainRoutes.use("/banner", bannerRoutes)