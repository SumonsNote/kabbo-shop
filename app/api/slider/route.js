import { Slider } from "@/app/models/slider-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  try {
    const sliderObj = await req.json();
    const slider = await Slider.create(sliderObj);
    return NextResponse.json({ slider }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const slider = await Slider.find();
    return NextResponse.json({ slider }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
