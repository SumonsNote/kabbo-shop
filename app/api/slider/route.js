import { NextResponse } from "next/server";
import connectMongo from "../../../services/mongo";
import { Slider } from "../../models/slider-model";

export async function POST(req) {
  try {
    await connectMongo();
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

export async function PUT(req) {
  try {
    await connectMongo();

    const formData = await req.formData();
    const sliderId = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const regular_price = formData.get("regular_price");
    const discount_price = formData.get("discount_price");

    // Ensure slider ID is provided
    if (!sliderId) {
      return NextResponse.json(
        { message: "Slider ID is required" },
        { status: 400 }
      );
    }

    // Ensure 'file' exists in formData
    let secure_url = "";
    if (formData.has("file")) {
      const file = formData.get("file");

      // Check if file is an object (Blob/File) and not a string
      if (typeof file !== "string") {
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

    // Prepare the slider object with new data
    if (secure_url) {
      const sliderObj = {
        image: secure_url,
        title,
        description,
        regular_price,
        discount_price,
      };

      // Update the existing slider in the database
      const slider = await Slider.findByIdAndUpdate(sliderId, sliderObj);
      return NextResponse.json(
        { message: "Successfully created slider", slider },
        { status: 201 }
      );
    }

    if (!slider) {
      return NextResponse.json(
        { message: "Slider not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { slider, message: "Successfully updated slider" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const slider = await Slider.find();
    return NextResponse.json({ slider }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();
    const { sliderId } = await req.json();
    console.log(sliderId);
    const slider = await Slider.findByIdAndDelete(sliderId);
    return NextResponse.json({ slider }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
