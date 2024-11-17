import { Product } from "@/app/models/product-model";
import { Stock } from "@/app/models/stock-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongo();
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("search");

  try {
    const partialMatchPattern = `.*${searchTerm}.*`;

    // First find matching products
    const matchingProducts = await Product.find({
      $or: [
        { product_model: { $regex: partialMatchPattern, $options: "i" } },
        { product_name: { $regex: partialMatchPattern, $options: "i" } },
        { brand_name: { $regex: partialMatchPattern, $options: "i" } },
      ],
    }).select("_id product_name product_model brand_name image");
    console.log(matchingProducts);
    // Then find stocks with matching product IDs
    const stocks = await Stock.find(
      {
        product: { $in: matchingProducts.map((p) => p._id) },
      },
      "stock variants status"
    ).populate({
      path: "product",
      model: Product,
      select: "image product_name product_model brand_name",
    });
    const response = matchingProducts.map((p) => ({
      product: p,
      stock: 0,
      variants: [],
      status: "Out of Stock",
    }));
    if (stocks.length === 0) {
      return NextResponse.json({ products: response }, { status: 200 });
    }
    return NextResponse.json({ products: stocks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
