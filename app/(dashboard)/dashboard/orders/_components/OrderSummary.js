import { CreditCard } from "lucide-react";
import { MapPin } from "lucide-react";
import { Truck } from "lucide-react";
import React from "react";

export default function OrderSummary({ order }) {
  console.log("order", order);
  return (
    <div className="grid grid-cols-1 text-gray-500 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Customer Info */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-base font-semibold">Customer Details</h2>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <p className="font-medium">{order?.customer.customer_name}</p>
            <p className="0">{order?.customer.email}</p>
            <div className="flex items-start gap-2 text-gray-500">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span> {order?.customer.address} </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-base font-semibold">Payment Information</h2>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>**** **** **** {order?.payment_info?.last4 || "1234"}</span>
            </div>
            <p className="text-gray-500 uppercase">
              {order?.payment_info.method}
            </p>
            <div className="flex justify-between items-center font-medium">
              <span>Amount Paid</span>
              <span>${order?.payment_info.amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-base font-semibold">Shipping Details</h2>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>{order?.shipping_method || "Express Delivery"}</span>
            </div>
            <p className="text-gray-500">
              Tracking: {order?.tracking_number || "1Z999AA1234567890"}
            </p>
            <div className="flex justify-between items-center">
              <span>Shipping Cost</span>
              <span>${order?.shipping_charge || "300"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
