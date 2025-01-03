import { CustomerProfile } from "@/app/models/customer-profile-model";
import { User } from "@/app/models/user-model";
import { dbConnect } from "@/utils/mongo";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const header = headers();
    const userId = header.get("id");

    const reqObj = await req.json();

    const customerProfile = await CustomerProfile.create({ ...reqObj, userId });
    return new Response.json(
      { status: "success", message: "Successfully created", customerProfile },
      { status: 200 }
    );
  } catch (error) {
    return new Response.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const header = headers();
    const userId = header.get("id");

    const reqObj = await req.json();

    const customerProfile = await CustomerProfile.findOneAndUpdate(
      { userId },
      reqObj,
      { new: true }
    );

    return NextResponse.json(
      { status: "success", message: "Successfully updated", customerProfile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const header = headers();
    const userId = header.get("id");

    const user = await User.find({});

    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}
