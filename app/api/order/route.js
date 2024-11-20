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
    if (body.customer) {
      const customer = await CustomerProfile.findOne({
        phone_number: body.customer.phone_number,
      });
      if (!customer) {
        const newCustomer = await CustomerProfile.create(body.customer);
        body.customer = newCustomer._id;
      } else {
        body.customer = customer._id;
      }
    }
    const orders = await Order.create(body);
    // // update stock
    // for (const item of body.items) {
    //   const product = await Product.findById(item.product);
    //   product.stock -= item.quantity;
    //   await product.save();
    // }
    // update customer orders
    await CustomerProfile.findByIdAndUpdate(body.customer, {
      $push: { orders: orders._id },
    });

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
    const orders = await Order.find().populate({
      path: "customer",
      model: CustomerProfile,
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
