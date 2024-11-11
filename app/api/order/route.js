import { CustomerProfile } from "@/app/models/customer-profile-model";
import { Order } from "@/app/models/order-model";
import { Product } from "@/app/models/product-model";
import { User } from "@/app/models/user-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongo();

  try {
    const body = await request.json();
    const orders = await Order.create(body);
    return NextResponse.json({
      message: "Order created successfully",
      success: true,
      orders,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function GET() {
  await connectMongo();

  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        model: CustomerProfile,
        populate: {
          path: "user",
          model: User,
        },
      })
      .populate({
        path: "items.product",
        model: Product,
      });
    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
