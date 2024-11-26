"use client";
import { useFetchSingleProductsQuery } from "@/store/slices/productApi";
import { notFound, useParams } from "next/navigation";
import Loading from "../../components/Loading";
import SingleProduct from "../_components/SingleProduct";

export default function SingleProductPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleProductsQuery(id);

  if (isError) {
    notFound();
  }
  console.log(data);

  isLoading && <Loading />;
  // console.log(data?.stock);
  return (
    <div className="w-full">
      <SingleProduct productData={data?.products} />
    </div>
  );
}
