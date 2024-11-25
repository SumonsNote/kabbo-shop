import { Product } from "@/app/models/product-model";
import { Stock } from "@/app/models/stock-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  console.log(id);
  await connectMongo();
  try {
    const product = await Stock.find({ product: id })
      .populate({
        path: "product",
        model: Product,
      })
      .lean();
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
