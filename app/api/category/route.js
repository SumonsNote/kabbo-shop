import { Category } from "@/app/models/category-model";
import connectMongo from "@/services/mongo";
import { dbConnect } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const categoryName = formData.get("title");
    const file = formData.get("file"); // Extract the file (Blob)

    if (!file) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }

    // Create a new FormData object
    const uploadFormData = new FormData();
    uploadFormData.append("file", file); // Append the file (Blob)

    // Send the new FormData to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: uploadFormData, // Pass the new FormData
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
      const categoryObj = {
        categoryImg: secure_url,
        categoryName,
      };

      const brand = await Category.create(categoryObj);
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

export async function PUT(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const categoryName = formData.get("title");
    const categoryId = formData.get("id");
    // Ensure 'file' exists in formData
    if (!formData.has("file")) {
      return NextResponse.json(
        { message: "File is required" },
        { status: 400 }
      );
    }

    let secure_url = "";
    const file = formData.get("file");
    console.log(formData);

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
          { message: "Failed to upload logo to Cloudinary" },
          { status: 400 }
        );
      }
    } else {
      secure_url = file; // Assume it's a direct URL if file is a string
    }

    if (secure_url) {
      const categoryObj = {
        categoryImg: secure_url,
        categoryName,
      };

      // Save brandObj to your database
      const category = await Category.findByIdAndUpdate(
        categoryId,
        categoryObj
      );
      return NextResponse.json(
        { message: "Successfully Updated Category", category },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Failed to upload logo" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(req) {
  await connectMongo();
  try {
    const categories = await Category.find();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
