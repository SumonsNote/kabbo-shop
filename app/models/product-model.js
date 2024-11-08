import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    regular_price: { type: String },
    status: {
      type: String,
      enum: ["in stock", "low stock", "out of stock"],
      default: "in stock",
    },
    product_code: { type: String, unique: true, required: true },
    image: [{ type: String }],
    display: {
      size: { type: String },
      type: { type: String },
      resolution: { type: String },
      features: { type: String },
    },
    processor: {
      chipset: { type: String },
      cpuType: { type: String },
      cpuSpeed: { type: String },
      gpu: { type: String },
    },
    memory: {
      ram: { type: String },
      internalStorage: { type: String },
    },
    rearCamera: {
      resolution: { type: String },
      features: { type: String },
      videoRecording: { type: String },
    },
    frontCamera: {
      resolution: { type: String },
      videoRecording: { type: String },
    },
    audio: {
      speaker: { type: String },
    },
    networkConnectivity: {
      sim: { type: String },
      network: { type: String },
      wifi: { type: String },
      bluetooth: { type: String },
      gps: { type: Boolean },
      nfc: { type: String, default: "N/A" },
      usb: { type: String },
      audioJack: { type: String },
    },
    operatingSystem: {
      os: { type: String },
    },
    features: {
      sensors: [{ type: String }],
      otherFeatures: { type: String },
    },
    battery: {
      type: { type: String },
      capacity: { type: String },
    },
    physicalSpecification: {
      dimensions: { type: String },
      weight: { type: String },
      bodyMaterial: { type: String },
      colors: [{ type: String }],
    },
    warrantyInformation: {
      warranty: { type: String },
      details: { type: String },
    },
    description: { type: String },
    brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
