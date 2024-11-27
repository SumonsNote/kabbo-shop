import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

import newProduct from "@/app/models/new-product-model";
import { transformProductData } from "@/utils/transformProductData";

export async function GET(req) {
  await connectMongo();
  try {
    // Fetch stocks and populate the product data
    const stocks = await newProduct.find(
      {},
      "name images discount_price discount_price original_price stock brand model region storage ram warrantyStatus"
    );

    // Transform the filtered data
    const transformedStocks = stocks.map((stock) => {
      const stockData = stock.toObject();
      return transformProductData(stockData);
    });

    return NextResponse.json({ products: transformedStocks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
