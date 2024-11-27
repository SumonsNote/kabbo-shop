import { NextResponse } from "next/server";
import connectMongo from "../../../services/mongo";
import { WeekendOffer } from "../../models/weekend-offer-model";

export async function POST(req) {
  try {
    await connectMongo();
    const formData = await req.formData();
    const title = formData.get("title");

    const short_description = formData.get("short_description");
    const productId = formData.get("productId");

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
      const weekendObj = {
        image: secure_url,
        title,
        short_description,
        productId,
      };

      const weekend = await WeekendOffer.create(weekendObj);
      return NextResponse.json(
        { weekend, message: "Successfully created weekend" },
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

export async function PUT(req) {
  try {
    await connectMongo();

    const formData = await req.formData();
    // console.log("weekend route", formData);

    const weekendId = formData.get("id");
    const title = formData.get("title");

    const short_description = formData.get("short_description");

    // Ensure weekend ID is provided
    if (!weekendId) {
      return NextResponse.json(
        { message: "Weekend ID is required" },
        { status: 400 }
      );
    }

    // Ensure 'file' exists in formData
    let secure_url = "";
    if (formData.has("file")) {
      const file = formData.get("file");

      // Check if file is an object (Blob/File) and not a string
      if (typeof file !== "string") {
        console.log("file");
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        // Send formData to Cloudinary
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/cloudinary`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        const responseBody = await response.json();

        // Check if the upload was successful
        if (response.ok) {
          secure_url = responseBody.secure_url;
        } else {
          return NextResponse.json(
            { message: "Failed to upload image to Cloudinary" },
            { status: 400 }
          );
        }
      } else {
        secure_url = file; // Assume it's a direct URL if file is a string
      }
    }

    // Prepare the weekend object with new data
    if (secure_url) {
      const weekendObj = {
        image: secure_url,
        title,
        short_description,
      };

      // Update the existing weekend in the database
      const weekend = await WeekendOffer.findByIdAndUpdate(
        weekendId,
        weekendObj
      );
      return NextResponse.json(
        { message: "Successfully updated weekend", weekend },
        { status: 201 }
      );
    }

    if (!weekend) {
      return NextResponse.json(
        { message: "weekend not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const weekend = await WeekendOffer.find();
    return NextResponse.json({ weekend }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();
    const { id } = await req.json();
    const weekend = await WeekendOffer.findByIdAndDelete(id);
    return NextResponse.json({ weekend }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
