import { Product } from "@/app/models/product-model";
import { Stock } from "@/app/models/stock-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongo();
  try {
    const stock = await Stock.findById(id).populate({
      path: "product",
      model: Product,
    });
    return NextResponse.json({ stock }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
