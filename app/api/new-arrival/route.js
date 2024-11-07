import { NewArrival } from "@/app/models/new-arrival-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  try {
    const newArrivalObj = await req.json();
    const newArrivals = await NewArrival.create(newArrivalObj);
    return NextResponse.json(
      {
        message: "Created a newArrival",
        newArrivals,
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
    const newArrivals = await NewArrival.find();
    return NextResponse.json({ newArrivals }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { stats: 500 });
  }
}
