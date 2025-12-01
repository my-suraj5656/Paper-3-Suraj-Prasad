import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phone: { type: String, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "organizer"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
