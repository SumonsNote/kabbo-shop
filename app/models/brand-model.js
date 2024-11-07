import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    logo: String,
    category: { type: String, required: true },
    status: {
      type: String,
      defaultValue: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

export const Brand =
  mongoose.models.Brand ?? mongoose.model("Brand", brandSchema);
