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
    display: {
      size: String,
      type: String,
      resolution: String,
      features: String,
    },
    processor: {
      chipset: String,
      cpuType: String,
      cpuSpeed: String,
      gpu: String,
    },
    memory: {
      ram: String,
      internalStorage: String,
    },
    rearCamera: {
      resolution: String,
      features: String,
      videoRecording: String,
    },
    frontCamera: {
      resolution: String,
      videoRecording: String,
    },
    audio: {
      speaker: String,
    },
    networkConnectivity: {
      sim: String,
      network: String,
      wifi: String,
      bluetooth: String,
      gps: Boolean,
      nfc: { type: String, default: "N/A" },
      usb: String,
      audioJack: String,
    },
    operatingSystem: {
      os: String,
    },
    features: {
      sensors: [String],
      otherFeatures: String,
    },
    battery: {
      type: String,
      capacity: String,
    },
    physicalSpecification: {
      dimensions: String,
      weight: String,
      bodyMaterial: String,
      colors: [String],
    },
    warrantyInformation: {
      warranty: String,
      details: String,
    },
    description: String,
    brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
