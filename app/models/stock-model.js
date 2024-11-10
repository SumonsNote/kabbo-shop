import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    sku: { type: String, required: true },
    stock: { type: Number, required: true },
    sell_price: { type: Number, required: true },
    purchase_price: { type: Number, required: true },
    dealer: { type: String, required: true },
    sold_out: { type: Number, default: 0 },
    variants: [
      {
        storage: {
          size: { type: Number, required: true },
          unit: { type: String, required: true },
        },
        regional_pricing: [
          {
            region: {
              name: { type: String, required: true },
              currency_code: { type: String, required: true },
              currency_symbol: { type: String, required: true },
            },
            price: { type: Number, required: true },
            stock_quantity: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Stock =
  mongoose.models.Stock ?? mongoose.model("Stock", stockSchema);
