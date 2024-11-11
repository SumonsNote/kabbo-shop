import { Product } from "../models/product-model";
import { Stock } from "../models/stock-model";

export async function getProductById(productId) {
  const product = await Stock.findOne({ product: productId })
    .populate({
      path: "product",
      model: Product,
    })
    .lean();
  return product;
}
