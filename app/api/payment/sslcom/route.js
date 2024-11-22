import { NextResponse } from "next/server";
import SSLCommerzPayment from "../../../../api/payment-controller.js";

export async function GET(request) {
  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWORD;
  const is_live = false; // Set to true for live environment

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const data = {
      total_amount: 100,
      currency: "BDT",
      tran_id: "REF123",
      tran_id: `REF${Date.now()}`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/payment/payment-success`,
      fail_url: `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/payment/payment-fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/payment/payment-cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/payment/payment-ipn`,
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("store_id", store_id);
    formData.append("store_passwd", store_passwd);
    const result = await sslcz.init(formData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
