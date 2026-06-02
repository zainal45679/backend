import jwt from "jsonwebtoken";
import env from "../../../env.js";

export const googleAuthSuccess = async (req, res) => {
  try {
    const token = jwt.sign(
      {
        userId: req.user._id,
        email: req.user.email,
      },
      env.USER_JWT_SECRET_KEY,
      {
        expiresIn: env.JWT_EXPIRES,
      }
    );

    return res.redirect(
      `${env.FRONTEND_URL}/auth-success?token=${token}`
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};