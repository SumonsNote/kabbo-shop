import { Brand } from "@/app/models/brand-model";
import { Category } from "@/app/models/category-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();

  try {
    const categoryObj = await req.json();
    const category = await Category.create(categoryObj);
    return NextResponse.json(
      { message: "Category created successfully", category },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const categories = await Category.find().populate({
      path: "brandId",
      model: Brand,
    });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
