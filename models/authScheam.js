import mongoose, { Schema } from "mongoose";

const authScheam = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { unique: true, type: String, required: true },
    age: {
      type: Number,
    },
    mobile: { type: Number, unique: true },
    address: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    status: { type: String, enum: ["active", "inactive"] },
    state: { type: String },
    city: { type: String },
  },

  { timestamps: true }
);

const authModal = mongoose.model("user", authScheam);
export { authModal };
