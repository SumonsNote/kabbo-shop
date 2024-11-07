import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
  name: { type: String, required: true, unique: true },
  logo: String,
  timestamps: true,
});

export const Brand =
  mongoose.models.Brand ?? mongoose.model("Brand", brandSchema);
