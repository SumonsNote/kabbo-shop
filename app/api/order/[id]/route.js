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
          path: "user",
          model: User,
        },
      })
      .populate({
        path: "items.product",
        model: Product,
        select: "brand_name category_name product_model product_name image",
      });

    const fullName = order.customer.user.full_name;
    return NextResponse.json({
      success: true,
      order: {
        ...order.toObject(),
        fullAddress: order.getFullAddress(),
        fullName,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
