import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    storage: { type: String, required: true },
    ram: { type: String, required: true },
    colors: { type: String, required: true },
    region: { type: String, required: true },
    isUsed: { type: String, required: true },
    stock: { type: Number, required: true },
    short_description: { type: String },
    specifications: { type: String },
    images: [{ type: Object }],
    simVariant: { type: String },
    warrantyStatus: { type: String },
    usedDuration: { type: String },
    batteryHealth: { type: String },
    scratches: { type: String },
    dents: { type: String },
    accessoriesWithDevice: { type: String },
    box: { type: String },
  },
  {
    timestamps: true,
  }
);

const newProduct =
  mongoose.models.NewProduct || mongoose.model("NewProduct", phoneSchema);

export default newProduct;
