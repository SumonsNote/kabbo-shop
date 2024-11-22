"use client";
import { useRouter } from "next/navigation";
import React from "react";
import BkashPayment from "./BkashPayment";
// import CheckoutPopup from "../components/ssl/CheckoutPopup";

export default function SSLCommerzPayment() {
  const router = useRouter();
  const handleCheackout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/payment/sslcom`,
      { mode: "no-cors" }
    );
    const data = await res.json();
    if (data.status == "SUCCESS") {
      router.push(data.GatewayPageURL);
    }
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center">
      <button
        className="px-4 py-2 bg-lime-200 rounded-md"
        onClick={handleCheackout}
      >
        buy now
      </button>
      <BkashPayment
        amount="100.00"
        onSuccess={(data) => console.log("Payment successful", data)}
        onError={(error) => console.error("Payment failed", error)}
      />
    </div>
  );
}
