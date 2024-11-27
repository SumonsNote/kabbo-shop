import newProduct from "@/app/models/new-product-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = params;
    const product = await newProduct.findById(id);
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
