import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    is_new: { type: Boolean, default: true },
    is_trending: { type: Boolean, default: false },
    is_offer: { type: Boolean, default: false },
    top_seller: { type: Boolean, default: false },
    best_seller: { type: Boolean, default: false },
    name: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    storage: { type: String, required: true },
    ram: { type: String, required: true },
    color: { type: Array, required: true },
    region: { type: String, required: true },
    isUsed: { type: String, required: true, default: "false" },
    short_description: { type: String },
    specifications: { type: String },
    images: Array,
    simVariant: { type: String },
    warrantyStatus: { type: String },
    usedDuration: { type: String },
    batteryHealth: { type: String },
    scratches: { type: String },
    dents: { type: String },
    accessoriesWithDevice: { type: String },
    box: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    stock: { type: Number, required: true },
    sold_out: { type: Number, default: 0 },
    reviews: { type: Array },
  },
  {
    timestamps: true,
  }
);

const newProduct =
  mongoose.models.NewProduct || mongoose.model("NewProduct", phoneSchema);

export default newProduct;
