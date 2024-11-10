import { Product } from "@/app/models/product-model";
import { Stock } from "@/app/models/stock-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();

  try {
    const stockObj = await req.json();
    const stock = await Stock.create(stockObj);
    return NextResponse.json(
      { message: "Stock created successfully", stock },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const stocks = await Stock.find().populate({
      path: "product",
      model: Product,
    });
    return NextResponse.json({ stocks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
