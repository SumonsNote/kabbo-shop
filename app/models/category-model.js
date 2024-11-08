import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
  },
  {
    timestamps: true,
  }
);

export const Category =
  mongoose.models.Category ?? mongoose.model("Category", categorySchema);
