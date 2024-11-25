import mongoose, { Schema } from "mongoose";
import { Product } from "./product-model";
const productSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    imei: {
      type: String,
      required: true,
      unique: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    variant: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const orderSchema = new Schema(
  {
    order_number: { type: String, unique: true, required: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "CustomerProfile",
      required: true,
    },
    items: [productSchema],
    total_amount: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shipping_details: {
      address: { type: String, required: true },
      city: { type: String },
      postal_code: { type: String },
      country: { type: String },
    },
    payment_info: {
      method: { type: String, required: true, default: "cash" },
      status: {
        type: String,
        required: true,
        enum: ["paid", "pending", "failed"],
        default: "paid",
      },

      transaction_id: { type: String },
      amount: { type: String, required: true },
    },
    tracking_number: { type: String },
    shipping_date: { type: Date },
    shipping_charge: { type: String, required: true, default: "0" },
    shipping_method: { type: String, required: true, default: "in-shop" },
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
