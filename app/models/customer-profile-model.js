import mongoose, { Schema } from "mongoose";

const customerProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  orderId: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export const CustomerProfile =
  mongoose.models.CustomerProfile ??
  mongoose.model("CustomerProfile", customerProfileSchema);
