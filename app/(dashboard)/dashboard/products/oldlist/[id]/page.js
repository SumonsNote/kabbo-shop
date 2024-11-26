"use client";
import { useFetchOldSingleProductQuery } from "@/store/slices/productApi";
import { useParams } from "next/navigation";
import Loading from "../../../components/Loading";
import PhoneDetails from "../components/ProductsDetails";

export default function IPhoneDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useFetchOldSingleProductQuery(id);
  console.log(data);
  isLoading && <Loading />;
  return <PhoneDetails data={data?.product || {}} />;
}
