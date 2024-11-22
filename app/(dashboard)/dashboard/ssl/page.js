"use client";
import { useRouter } from "next/navigation";
import React from "react";

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
    <div className="flex h-[90vh] w-full flex-col justify-evenly items-center">
      <button
        className="px-4 py-2 bg-lime-200 rounded-md"
        onClick={handleCheackout}
      >
        Pay Now
      </button>
      <div className="">
        <a
          target="_blank"
          href="https://www.sslcommerz.com/"
          title="SSLCommerz"
          alt="SSLCommerz"
        >
          <img
            style={{ width: "1200px", height: "auto" }}
            src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
          />
        </a>
        <a
          target="_blank"
          href="https://www.sslcommerz.com/"
          title="SSLCommerz"
          alt="SSLCommerz"
        >
          <img
            style={{ width: "1200px", height: "auto" }}
            src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png"
          />
        </a>
      </div>
    </div>
  );
}
