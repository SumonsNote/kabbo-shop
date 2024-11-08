import { Product } from "@/app/models/product-model";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { id } = params;
    const products = await Product.findById(id);
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
