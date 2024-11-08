import { CustomerProfile } from "@/app/models/customer-profile-model";
import { Order } from "@/app/models/order-model";
import { Product } from "@/app/models/product-model";
import { User } from "@/app/models/user-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongo();

  const { id } = params;

  try {
    const order = await Order.findById(id)
      .populate({
        path: "customer",
        model: CustomerProfile,
        populate: {
          path: "userId",
          model: User,
        },
      })
      .populate({
        path: "items.product",
        model: Product,
      });
    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
