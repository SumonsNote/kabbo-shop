import connectMongo from "../../../../services/mongo";
import newProduct from "../../../models/new-product-model";

export async function POST(req) {
  await connectMongo();
  const body = await req.json();
  try {
    const product = await newProduct.create(body);
    return new Response(JSON.stringify({ success: true, product: product }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function GET(req) {
  await connectMongo();
  try {
    const products = await newProduct.find({});
    return new Response(JSON.stringify({ success: true, products: products }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
