import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    price: { type: String, required: true },
    regular_price: { type: String },
    status: {
      type: String,
      enum: ["in stock", "out of stock"],
      default: "in stock",
    },
    product_code: { type: String, unique: true, required: true },
    image: [{ type: String }],
    brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
    specificationId: { type: Schema.Types.ObjectId, ref: "Specification" },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
