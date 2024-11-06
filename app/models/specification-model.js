import mongoose, { Schema } from "mongoose";

const specificationSchema = new Schema({
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
});

export const Specification =
  mongoose.models.Specification ??
  mongoose.model("Specification", specificationSchema);
