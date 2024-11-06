import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: String,
    image: String,
    slug: String,
    parent_category: String,
  },
  {
    timestamps: true,
  }
);

export const Category =
  mongoose.models.Category ?? mongoose.model("Category", categorySchema);
