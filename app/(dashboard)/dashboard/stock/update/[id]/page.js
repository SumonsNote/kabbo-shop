import React from "react";
import AddStockForm from "../../_components/AddStockForm";
import BackButton from "../../../components/ui/BackButton";

export default async function UpdatePage({ params: { id } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/stock/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  // console.log(data);

  return (
    <div className="w-full mx-auto   rounded-lg shadow-lg">
      <AddStockForm stock={data.stock} isEdit={true} />
    </div>
  );
}
