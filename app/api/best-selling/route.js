import { BestSelling } from "@/app/models/best-selling-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  try {
    const bestSellingObj = await req.json();
    const bestSellings = await BestSelling.create(bestSellingObj);
    return NextResponse.json(
      {
        message: "Created a best selling",
        bestSellings,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const bestSelling = await BestSelling.find();
    return NextResponse.json({ bestSelling }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { stats: 500 });
  }
}
