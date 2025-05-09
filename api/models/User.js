import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    verificationCode: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "/uploads/defaults/avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
