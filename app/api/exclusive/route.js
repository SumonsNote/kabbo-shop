import { NextResponse } from "next/server";
import connectMongo from "../../../services/mongo";
import { ExclusiveOffer } from "../../models/exclusive-offer-model";

export async function POST(req) {
  try {
    await connectMongo();
    const formData = await req.formData();
    const label = formData.get("label");
    const title = formData.get("title");
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
      const exclusiveObj = {
        image: secure_url,
        label,
        title,
        productId,
      };

      const exclusive = await ExclusiveOffer.create(exclusiveObj);
      return NextResponse.json(
        { exclusive, message: "Successfully created exclusive" },
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
    // console.log("exclusive route", formData);

    const exclusiveId = formData.get("id");
    const label = formData.get("label");
    const title = formData.get("title");

    // Ensure exclusive ID is provided
    if (!exclusiveId) {
      return NextResponse.json(
        { message: "exclusive ID is required" },
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

    // Prepare the exclusive object with new data
    if (secure_url) {
      const exclusiveObj = {
        image: secure_url,
        label,
        title,
      };

      // Update the existing exclusive in the database
      const exclusive = await ExclusiveOffer.findByIdAndUpdate(
        exclusiveId,
        exclusiveObj
      );
      return NextResponse.json(
        { message: "Successfully updated exclusive", exclusive },
        { status: 201 }
      );
    }

    if (!exclusive) {
      return NextResponse.json(
        { message: "exclusive not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req, res) {
  await connectMongo();
  try {
    const exclusive = await ExclusiveOffer.find();
    return NextResponse.json({ exclusive }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();
    const { id } = await req.json();
    const exclusive = await ExclusiveOffer.findByIdAndDelete(id);
    return NextResponse.json({ exclusive }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
