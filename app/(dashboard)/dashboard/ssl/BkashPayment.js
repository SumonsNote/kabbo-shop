"use client";

import { useEffect, useCallback } from "react";
import Script from "next/script";

export default function BkashPayment({
  amount = "100.00",
  onSuccess,
  onError,
}) {
  const initBkash = useCallback(() => {
    if (typeof window === "undefined" || !window.bKash) return;

    let paymentID = "";
    window.bKash.init({
      paymentMode: "checkout",
      paymentRequest: {
        amount: amount,
        intent: "sale",
      },
      createRequest: function (request) {
        $.ajax({
          url: "MERCHANT_BACKEND_CREATE_API_CALLER_URL",
          type: "POST",
          contentType: "application/json",
          success: function (data) {
            data = JSON.parse(data);
            if (data && data.paymentID != null) {
              paymentID = data.paymentID;
              window.bKash.create().onSuccess(data);
            } else {
              window.bKash.create().onError();
            }
          },
          error: function () {
            window.bKash.create().onError();
          },
        });
      },
      executeRequestOnAuthorization: function () {
        $.ajax({
          url: "MERCHANT_BACKEND_EXECUTE_API_CALLER_URL",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            paymentID: paymentID,
          }),
          success: function (data) {
            data = JSON.parse(data);
            if (data && data.paymentID != null) {
              onSuccess?.(data);
              window.location.href = "/success.html";
            } else {
              onError?.(new Error("Payment failed"));
              window.bKash.execute().onError();
            }
          },
          error: function () {
            onError?.(new Error("Payment execution failed"));
            window.bKash.execute().onError();
          },
        });
      },
    });
  }, [amount, onSuccess, onError]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.bKash) {
      initBkash();
    }
  }, [initBkash]);

  return (
    <>
      <Script
        src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"
        onLoad={initBkash}
      />
      <button
        onClick={() =>
          window.bKash?.reconfigure({ paymentRequest: { amount } })
        }
        className="px-4 py-2 bg-[#e2136e] text-white rounded-lg hover:bg-[#c11161] transition-colors"
      >
        Pay with bKash
      </button>
    </>
  );
}
