import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("users", userSchema);
