import mongoose, { Schema } from "mongoose";

const customerProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  order: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export const CustomerProfile =
  mongoose.models.CustomerProfile ??
  mongoose.model("CustomerProfile", customerProfileSchema);

// write a custom function tp calculate total spent of all users in order
