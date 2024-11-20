import { CustomerProfile } from "@/app/models/customer-profile-model";
import { Order } from "@/app/models/order-model";
import connectMongo from "@/services/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongo();

  const { id } = params;

  try {
    const order = await Order.findById(id).populate({
      path: "customer",
      model: CustomerProfile,
    });
    console.log(order);

    return NextResponse.json({
      success: true,
      order: {
        ...order.toObject(),
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
