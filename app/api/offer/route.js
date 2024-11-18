import { OfferSection } from "@/app/models/offer-section-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();
    const formData = await req.formData();
    const title = formData.get("title");
    const brand = formData.get("brand");
    const regular_price = formData.get("regular_price");
    const discount_price = formData.get("discount_price");

    // Ensure 'file' exists in formData for the main image
    if (!formData.has("file")) {
      return NextResponse.json(
        { message: "Main image file is required" },
        { status: 400 }
      );
    }

    // Ensure 'sub_files' exists in formData for sub-images
    const subFiles = formData.getAll("sub_files");
    if (subFiles.length === 0) {
      return NextResponse.json(
        { message: "At least one sub-image file is required" },
        { status: 400 }
      );
    }

    // Upload the main image to Cloudinary
    const mainImageResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/cloudinary`,
      {
        method: "POST",
        body: formData, // Only the `file` field is used
      }
    );
    const mainImageBody = await mainImageResponse.json();

    if (!mainImageResponse.ok || !mainImageBody.secure_url) {
      return NextResponse.json(
        { message: "Failed to upload main image to Cloudinary" },
        { status: 400 }
      );
    }

    const mainImageUrl = mainImageBody.secure_url;

    // Upload all sub-images to Cloudinary
    const subImageUrls = [];
    for (const subFile of subFiles) {
      const subFormData = new FormData();
      subFormData.append("file", subFile);

      const subImageResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/cloudinary`,
        {
          method: "POST",
          body: subFormData,
        }
      );

      const subImageBody = await subImageResponse.json();

      if (!subImageResponse.ok || !subImageBody.secure_url) {
        return NextResponse.json(
          { message: "Failed to upload one or more sub-images to Cloudinary" },
          { status: 400 }
        );
      }

      subImageUrls.push(subImageBody.secure_url);
    }

    // Create the offer object with the uploaded image URLs
    const offerObj = {
      image: mainImageUrl,
      sub_img: subImageUrls, // Array of sub-image URLs
      title,
      brand,
      regular_price,
      discount_price,
    };

    // Save the offer to the database
    const offer = await OfferSection.create(offerObj);

    return NextResponse.json(
      { offer, message: "Successfully created offer with images" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
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
