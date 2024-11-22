// import { NextResponse } from "next/server";
// import SSLCommerzPayment from "sslcommerz-lts";

// const store_id = "zazab66577daa59d5e";
// const store_passwd = "zazab66577daa59d5e@ssl";
// const is_live = false; //true for live, false for sandbox

// export async function GET(req) {
//   const data = {
//     total_amount: 100,
//     currency: "BDT",
//     tran_id: "REF123", // use unique tran_id for each api call
//     success_url: "http://localhost:3000/success",
//     fail_url: "http://localhost:3000/fail",
//     cancel_url: "http://localhost:3000/cancel",
//     ipn_url: "http://localhost:3000/ipn",
//     shipping_method: "Courier",
//     product_name: "Computer.",
//     product_category: "Electronic",
//     product_profile: "general",
//     cus_name: "Customer Name",
//     cus_email: "customer@example.com",
//     cus_add1: "Dhaka",
//     cus_add2: "Dhaka",
//     cus_city: "Dhaka",
//     cus_state: "Dhaka",
//     cus_postcode: "1000",
//     cus_country: "Bangladesh",
//     cus_phone: "01711111111",
//     cus_fax: "01711111111",
//     ship_name: "Customer Name",
//     ship_add1: "Dhaka",
//     ship_add2: "Dhaka",
//     ship_city: "Dhaka",
//     ship_state: "Dhaka",
//     ship_postcode: 1000,
//     ship_country: "Bangladesh",
//   };
//   const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//   sslcz.init(data).then((apiResponse) => {
//     // Redirect the user to payment gateway
//     let GatewayPageURL = apiResponse.GatewayPageURL;
//     console.log("Redirecting to: ", GatewayPageURL);
//     return NextResponse.redirect(GatewayPageURL);
//   });
// }
import { NextResponse } from "next/server";
import SSLCommerzPayment from "../../../../api/payment-controller.js";

export async function GET(request) {
  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWORD;
  const is_live = false; // Set to true for live environment
  // const store_id = "zazab66577daa59d5e";
  // const store_passwd = "zazab66577daa59d5e@ssl";
  // const is_live = false; //true for live, false for sandbox

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const data = {
      total_amount: 100,
      currency: "BDT",
      tran_id: "REF123",
      success_url: "http://localhost:3000/success",
      fail_url: "http://localhost:3000/fail",
      cancel_url: "http://localhost:3000/cancel",
      ipn_url: "http://localhost:3000/ipn",
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

export async function POST(request) {
  try {
    const body = await request.json();
    const sslcz = new SslCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      process.env.NODE_ENV === "production"
    );

    const data = {
      total_amount: body.amount,
      currency: "BDT",
      tran_id: `REF${Date.now()}`,
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/ipn`,
      shipping_method: "NO",
      product_name: body.product_name,
      product_category: "Electronic",
      product_profile: "general",
      cus_name: body.cus_name,
      cus_email: body.cus_email,
      cus_add1: body.cus_add1,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: body.cus_phone,
      cus_fax: "01711111111",
      ship_name: body.cus_name,
      ship_add1: body.cus_add1,
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const result = await sslcz.init(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
