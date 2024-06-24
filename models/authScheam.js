import mongoose, { Schema } from "mongoose";

const authScheam = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, unique: true, minlength: 8 },
  },

  { timestamps: true }
);

const authModal = mongoose.model("user", authScheam);
export { authModal };
