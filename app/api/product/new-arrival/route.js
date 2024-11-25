import { Product } from "@/app/models/product-model";
import { Stock } from "@/app/models/stock-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";
import { transformProductData } from "../../shop/route";

export async function GET(req) {
  await connectMongo();
  try {
    // Fetch stocks and populate the product data
    const stocks = await Stock.find().populate({
      path: "product",
      model: Product,
      select: "product_name image is_new brand_name warranty_information",
    });

    // Filter for best-seller products
    const filteredStocks = stocks.filter(
      (stock) => stock.product && stock.product.is_new === true
    );

    // Transform the filtered data
    const transformedStocks = filteredStocks.map((stock) => {
      const stockData = stock.toObject();
      return transformProductData(stockData);
    });

    return NextResponse.json(
      { bestSellers: transformedStocks },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
