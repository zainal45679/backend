import express from "express";
import { getAllBanner } from "../../controlers/frontend/banner-controller.js";
import passport from "../../config/passport.js";
import { googleAuthSuccess } from "../../controlers/frontend/auth-controller.js";

export const authRoutes = express.Router();

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  }),
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleAuthSuccess,
);

authRoutes.get("/google", (req, res, next) => {
  console.log("GOOGLE ROUTE HIT");
  next();
}, passport.authenticate("google", {
  scope: ["profile", "email"],
}));