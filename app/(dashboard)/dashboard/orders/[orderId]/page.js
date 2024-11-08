"use client";
import React from "react";
import { Package, Truck, Calendar, CreditCard, MapPin } from "lucide-react";
import OrderSummary from "../_components/OrderSummary";
import OrderItem from "../_components/OrderItem";
import { useFetchSingleOrdersQuery } from "@/store/slices/orderApi";

const OrderDetails = ({ params }) => {
  const { data, isLoading, isError, error, isSuccess } =
    useFetchSingleOrdersQuery(params.orderId);
  console.log(data);
  const { order } = isSuccess && data;
  //   const order = {
  //     id: "#ORD-71251",
  //     date: "November 9, 2024",
  //     status: "In Transit",
  //     customer: {
  //       name: "Sarah Johnson",
  //       email: "sarah.j@example.com",
  //       address: "123 Pine Street, Seattle, WA 98101",
  //     },
  //     payment: {
  //       method: "Credit Card",
  //       last4: "4242",
  //       amount: 234.5,
  //       status: "Paid",
  //     },
  //     items: [
  //       {
  //         id: 1,
  //         name: "Wireless Headphones",
  //         sku: "WH-2024",
  //         price: 129.99,
  //         quantity: 1,
  //       },
  //       {
  //         id: 2,
  //         name: "Smart Watch",
  //         sku: "SW-1001",
  //         price: 89.99,
  //         quantity: 1,
  //       },
  //     ],
  //     shipping: {
  //       method: "Express Delivery",
  //       tracking: "1Z999AA1234567890",
  //       cost: 14.52,
  //     },
  //   };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl dark:text-gray-500 font-bold">
            Order {order?.order_number}
          </h1>
          <p className="text-gray-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {order?.createdAt.slice(0, 10)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            {order?.status}
          </span>
        </div>
      </div>

      {/* Order Summary Cards */}
      <OrderSummary order={order} />

      {/* Order Items */}
      <OrderItem order={order} />
    </div>
  );
};

export default OrderDetails;
