import SingleProduct from "../_components/SingleProduct";

export default async function SingleProductPage({ params: { id } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product/${id}`,
    { cache: "no-cache" }
  );
  const data = await res.json();

  return (
    <div className="w-full">
      <SingleProduct productData={data?.products} />
    </div>
  );
}
