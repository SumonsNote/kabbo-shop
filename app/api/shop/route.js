import { Product } from "@/app/models/product-model";
import { Stock } from "@/app/models/stock-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongo();
  try {
    const stocks = await Stock.find({}, "stock variants status").populate({
      path: "product",
      model: Product,
      select: "image product_name product_model brand_name",
    });

    // Process the variants to get only the first one (if needed)
    // Transform the data
    const transformedStocks = stocks.map((stock) => {
      // Convert Mongoose document to plain object
      const stockData = stock.toObject();
      return transformProductData(stockData);
    });
    console.log(transformedStocks);
    return NextResponse.json({ products: transformedStocks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const transformProductData = (stockData) => {
  // Get the first variant and its global pricing
  const defaultVariant = stockData.variants[0];
  const globalPricing =
    defaultVariant.regional_pricing.find(
      (pricing) => pricing.region.name === "global"
    ) || defaultVariant.regional_pricing[0];

  // Create filters array
  const filters = [
    { filterName: "model", value: stockData.product.product_name },
    { filterName: "stock", value: stockData.status },
    {
      filterName: "storage",
      value: `${defaultVariant.storage.size}${defaultVariant.storage.unit}`,
    },
    { filterName: "brand", value: stockData.product.brand_name },
  ];

  return {
    image: stockData.product.image[0]?.url || "/placeholder.jpg",
    name: stockData.product.product_name,
    title: `${stockData.product.product_name} ${defaultVariant.storage.size}${defaultVariant.storage.unit} ${defaultVariant.regional_pricing[0].region.name}`,
    rating: "5", // Default rating or could be dynamic
    currentPrice: globalPricing.discount_price
      ? globalPricing.discount_price.toString()
      : globalPricing.price.toString(),
    oldPrice: globalPricing.price.toString(),
    discount: globalPricing.discount_price
      ? (
          ((globalPricing.price - globalPricing.discount_price) /
            globalPricing.price) *
          100
        ).toFixed(0) + "%"
      : "",
    soldOut: stockData.stock < 1,
    filters: filters,
    url: `/product/${stockData._id}`, // Assuming this is your product URL structure
  };
};
