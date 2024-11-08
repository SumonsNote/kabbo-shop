import { Brand } from "@/app/models/brand-model";
import { dbConnect } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const status = formData.get("status");

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
        { message: "Failed to upload logo to Cloudinary" },
        { status: 400 }
      );
    }

    const { secure_url } = responseBody;

    if (secure_url) {
      const brandObj = {
        logo: secure_url,
        title,
        category,
        status,
      };

      const brand = await Brand.create(brandObj);
      return NextResponse.json(
        { brand, message: "Successfully created brand" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Failed to upload logo" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const brands = await Brand.find();
    return NextResponse.json({ brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
