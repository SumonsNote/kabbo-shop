import { Banner } from "@/app/models/banner-model";
import { Slider } from "@/app/models/slider-model";
import connectMongo from "@/services/mongo";
import { dbConnect } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const regular_price = formData.get("regular_price");
    const discount_price = formData.get("discount_price");

    console.log(formData);
    // Ensure 'file' exists in formData
    if (!formData.has("file")) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }

    // Sending form data to Cloudinary for file upload
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/cloudinary`,
      {
        method: "POST",
        body: formData,
      }
    );
    const responseBody = await response.json();
    console.log(responseBody);

    // Check if the response is successful
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to upload image to Cloudinary" },
        { status: 400 }
      );
    }

    const { secure_url } = responseBody;

    if (secure_url) {
      const sliderObj = {
        image: secure_url,
        title,
        description,
        regular_price,
        discount_price,
      };

      const slider = await Slider.create(sliderObj);
      return NextResponse.json(
        { slider, message: "Successfully created slider" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
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
