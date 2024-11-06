import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    description: String,
    base_price: Number,
    discount: Number,
    discount_price: Number,
    stock: Number,
    images: Array,
    category: String,
    sku: String,
    source: String,
    stock_status: String,
    weight: String,
    length: String,
    width: String,
    height: String,
    meta_title: String,
    meta_description: String,
    star: Number,
    brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
