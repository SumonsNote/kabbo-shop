import { Deal } from "@/app/models/deal-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();
    const formData = await req.formData();
    const title = formData.get("title");
    const label = formData.get("label");
    const short_description = formData.get("short_description");

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
      const dealObj = {
        image: secure_url,
        title,
        label,
        short_description,
      };

      const deal = await Deal.create(dealObj);
      return NextResponse.json(
        { deal, message: "Successfully created deal" },
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
    // console.log("deal route", formData);

    const dealId = formData.get("id");
    const title = formData.get("title");
    const label = formData.get("label");
    const short_description = formData.get("short_description");

    // Ensure deal ID is provided
    if (!dealId) {
      return NextResponse.json(
        { message: "Deal ID is required" },
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

    // Prepare the deal object with new data
    if (secure_url) {
      const dealObj = {
        image: secure_url,
        title,
        short_description,
        label,
      };

      // Update the existing deal in the database
      const deal = await Deal.findByIdAndUpdate(dealId, dealObj);
      return NextResponse.json(
        { message: "Successfully updated deal", deal },
        { status: 201 }
      );
    }

    if (!deal) {
      return NextResponse.json({ message: "deal not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const deal = await Deal.find();
    return NextResponse.json({ deal }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();
    const { dealId } = await req.json();
    console.log(dealId);
    const deal = await Deal.findByIdAndDelete(dealId);
    return NextResponse.json({ deal }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
