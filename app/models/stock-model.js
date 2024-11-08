import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    reorderLevel: { type: Number, required: true, min: 0 },

    location: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Stock =
  mongoose.models.Stock ?? mongoose.model("Stock", stockSchema);
