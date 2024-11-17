import { Brand } from "@/app/models/brand-model";
import { Product } from "@/app/models/product-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Parse request body
    const productObj = await req.json();

    // Validate product object (add specific validation as needed)
    if (!productObj._id) {
      throw new Error("Product ID is required.");
    }

    // Update product in database
    const product = await Product.findByIdAndUpdate(
      productObj._id,
      productObj,
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT request:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const productObj = await req.json();

    const product = await Product.create(productObj);

    // Update the brand
    // First find the brand document
    const brand = await Brand.findOne({ title: productObj.brand_name });

    // Push the product ID to the brand's products array
    brand.product_name.push(product._id);

    // Save the updated brand
    await brand.save();

    return NextResponse.json(
      { product, message: "Successfully created product" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("search");
    if (!searchTerm) {
      const products = await Product.find().sort({ createdAt: -1 });
      return NextResponse.json({ products }, { status: 200 });
    }
    const products = await Product.find({
      $or: [
        { product_name: { $regex: new RegExp(`.*${searchTerm}.*`, "i") } },
        { product_model: { $regex: new RegExp(`.*${searchTerm}.*`, "i") } },
        { product_id: { $regex: new RegExp(`.*${searchTerm}.*`, "i") } },
      ],
    }).sort({ createdAt: -1 });
    console.log(products);
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
