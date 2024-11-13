import { Deal } from "@/app/models/deal-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  try {
    const dealObj = await req.json();
    const deal = await Deal.create(dealObj);
    return NextResponse.json({ deal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const deal = await Deal.find();
    return NextResponse.json({ deal }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
