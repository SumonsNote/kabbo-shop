import { Product } from "@/app/models/product-model";
import { Stock } from "@/app/models/stock-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongo();
  try {
    const stocks = await Stock.find().select("stock").populate({
      path: "product",
      model: Product,
      select: "product_name image best_seller",
    });

    const filteredStocks = stocks.filter(
      (stock) => stock.product && stock.product.best_seller === true
    );

    return NextResponse.json({ stocks: filteredStocks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
