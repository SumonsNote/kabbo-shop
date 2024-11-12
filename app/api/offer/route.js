import { OfferSection } from "@/app/models/offer-section-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  try {
    const offerObj = await req.json();
    const offer = await OfferSection.create(offerObj);
    return NextResponse.json({ offer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const offer = await OfferSection.find();
    return NextResponse.json({ offer }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
