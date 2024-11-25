import mongoose, { Schema } from "mongoose";

const customerProfileSchema = new Schema({
  customer_name: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export const CustomerProfile =
  mongoose.models.CustomerProfile ??
  mongoose.model("CustomerProfile", customerProfileSchema);

// write a custom function tp calculate total spent of all users in order
