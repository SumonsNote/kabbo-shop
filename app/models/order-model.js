import mongoose, { Schema } from "mongoose";

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
          ref: "Product",
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
      transaction_id: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export const Order =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
