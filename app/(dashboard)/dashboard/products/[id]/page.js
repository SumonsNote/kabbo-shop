import { notFound } from "next/navigation";
import SingleProduct from "../_components/SingleProduct";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product/${id}`,
    {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return data?.products;
}

export default async function SingleProductPage({ params }) {
  const productData = await getProduct(params.id);

  if (!productData) {
    notFound();
  }

  return (
    <div className="w-full">
      <SingleProduct productData={productData} />
    </div>
  );
}
