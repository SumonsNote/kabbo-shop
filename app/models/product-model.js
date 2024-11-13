import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    is_new: { type: Boolean, default: false },
    is_trending: { type: Boolean, default: false },
    is_offer: { type: Boolean, default: false },
    top_seller: { type: Boolean, default: false },
    best_seller: { type: Boolean, default: false },

    product_name: { type: String, required: true },
    status: String,
    product_model: { type: String, unique: true },

    image: [
      {
        url: { type: String, required: true },
        colors: { type: String, required: true },
      },
    ],
    display: { type: Object },
    processor: { type: Object },
    memory: { type: Object },
    rear_camera: { type: Object },
    front_camera: { type: Object },
    audio: { type: Object },
    network_connectivity: { type: Object },
    operating_system: { type: Object },
    features: { type: Object },
    battery: { type: Object },
    physical_specification: { type: Object },
    warranty_information: { type: Object },
    description: { type: String, required: true },
    brand_name: { type: String, required: true },
    category_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
