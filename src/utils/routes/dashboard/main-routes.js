import express from "express"
import { categoryRoutes } from "./category-routes.js";

export const dashboardMainRoutes = express.Router();

dashboardMainRoutes.use("/category", categoryRoutes)