import mongoose, { Schema } from "mongoose";

const weekendSchema = new Schema({
  title: { type: String, required: true },
  short_description: { type: String, required: true },
  image: { type: String, required: true },
});

const exclusiveSchema = new Schema({
  label: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const bannerSchema = new Schema(
  {
    weekend: [weekendSchema],
    exclusive: exclusiveSchema,
  },
  { timestamps: true }
);

export const Banner =
  mongoose.models.Banner ?? mongoose.model("Banner", bannerSchema);
