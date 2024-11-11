import mongoose, { Schema } from "mongoose";
import { Product } from "./product-model";

const orderSchema = new Schema(
  {
    order_number: { type: String, unique: true, required: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "CustomerProfile",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: Product,
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: String, required: true },
      },
    ],
    total_amount: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shipping_details: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment_info: {
      method: { type: String, required: true },
      status: { type: String, required: true },
      transaction_id: { type: String },
      amount: { type: String, required: true },
    },
    tracking_number: { type: String },
    shipping_date: { type: Date },
    shipping_charge: { type: String, required: true },
    shipping_method: { type: String, required: true },
    delivery_date: { type: Date },
    requires_tracking: { type: Boolean, default: false },
    requires_payment_receipt: { type: Boolean, default: false },
    requiresAttention: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Add a method to the schema to get the full address
orderSchema.methods.getFullAddress = function () {
  return `${this.shipping_details.address}, ${this.shipping_details.city}, ${this.shipping_details.postal_code}, ${this.shipping_details.country}`;
};

export const Order =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
