import { User } from "@/app/models/user-model";
import { dbConnect } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    const userData = await request.json();
    const user = await User.create(userData);

    return NextResponse.json(
      { status: "success", message: "Successfully created", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const reqObj = await req.json();

    const customerProfile = await User.findOneAndUpdate(
      { _id: reqObj._id },
      reqObj,
      {
        new: true,
      }
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

    const user = await User.find({});

    return NextResponse.json({ status: "success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}
