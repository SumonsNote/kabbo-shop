import { Brand } from "@/app/models/brand-model";
import { Product } from "@/app/models/product-model";
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
    // get search parameters
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");
    console.log(category);
    await dbConnect();
    if (category) {
      const brands = await Brand.find({
        category: category.toLowerCase(),
      }).populate({
        path: "product_name",
        model: Product,
        select: "product_name",
      });
      return NextResponse.json({ brands }, { status: 200 });
    }

    const brands = await Brand.find().populate({
      path: "product_name",
      model: Product,
      select: "product_name",
    });
    return NextResponse.json({ brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const status = formData.get("status");
    const brandId = formData.get("id");

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
      const brandObj = {
        logo: secure_url,
        title,
        category,
        status,
      };

      // Save brandObj to your database
      const brand = await Brand.findByIdAndUpdate(brandId, brandObj);
      return NextResponse.json(
        { message: "Successfully created brand", brand },
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

export async function DELETE(req) {
  try {
    await dbConnect();
    const { brandId } = await req.json();
    const brand = await Brand.findOneAndDelete({ _id: brandId });
    return NextResponse.json({ brand }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
