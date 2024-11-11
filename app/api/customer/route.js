import { CustomerProfile } from "@/app/models/customer-profile-model";
import { Order } from "@/app/models/order-model";
import { User } from "@/app/models/user-model";
import connectMongo from "@/services/mongo";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();
    const reqObj = await req.json();
    const customerProfile = await CustomerProfile.create(reqObj);
    return NextResponse.json({ status: 201, customerProfile });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectMongo();
    const customerProfiles = await CustomerProfile.find()
      .populate({
        path: "user",
        model: User,
        select: "first_name last_name createdAt",
      })
      .populate({
        path: "order",
        model: Order,
      });
    return NextResponse.json({ customerProfiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
