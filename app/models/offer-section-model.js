import mongoose, { Schema } from "mongoose";

const countdownSchema = new Schema(
  {
    short_description: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const offerSectionSchema = new Schema(
  {
    main_img: { type: String, required: true },
    sub_img: { type: [String], required: true },
    discount: { type: String, required: true },
    label: { type: String, required: true },
    brand: { type: String, required: true },
    title: { type: String, required: true },
    discount_price: { type: Number, required: true },
    regular_price: { type: Number, required: true },
    display: { type: String, required: true },
    processor: { type: String, required: true },
    camera: { type: String, required: true },
  },
  { timestamps: true }
);

const offerSectionCombinedSchema = new Schema(
  {
    countdown: { type: countdownSchema, required: true },
    offer: { type: [offerSectionSchema], required: true },
  },
  { timestamps: true }
);

export const OfferSection =
  mongoose.models.OfferSection ??
  mongoose.model("OfferSection", offerSectionCombinedSchema);
