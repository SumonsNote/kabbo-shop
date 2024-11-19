import mongoose, { Schema } from "mongoose";

const weekendSchema = new Schema([
  {
    title: { type: String, required: true },
    short_description: { type: String, required: true },
    image: { type: String, required: true },
  },
]);
export const WeekendOffer =
  mongoose.models.WeekendOffer ?? mongoose.model("WeekendOffer", weekendSchema);
