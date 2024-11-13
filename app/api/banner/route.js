import { Banner } from "@/app/models/banner-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  try {
    const bannerObj = await req.json();
    const banner = await Banner.create(bannerObj);
    return NextResponse.json({ banner }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const banner = await Banner.find();
    return NextResponse.json({ banner }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
