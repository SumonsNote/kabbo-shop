import { Trending } from "@/app/models/trending-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  try {
    const trendingObj = await req.json();
    const trendings = await Trending.create(trendingObj);
    return NextResponse.json(
      {
        message: "Created a trending",
        trendings,
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
    const trending = await Trending.find();
    return NextResponse.json({ trending }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { stats: 500 });
  }
}
