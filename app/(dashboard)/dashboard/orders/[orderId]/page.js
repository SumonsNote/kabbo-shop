"use client";
import { useFetchSingleOrdersQuery } from "@/store/slices/orderApi";
import { Calendar } from "lucide-react";
import Loading from "../../components/Loading";
import OrderItem from "../_components/OrderItem";
import OrderSummary from "../_components/OrderSummary";
import { getStatusStyle } from "../_components/OrderTable";

const OrderDetails = ({ params }) => {
  const { data, isLoading } = useFetchSingleOrdersQuery(params.orderId);
  console.log(data);
  if (isLoading) return <Loading />;
  const order = data?.order;

  return (
    <div className="p-6 max-w-7xl w-full px-20  space-y-6">
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
          <span
            className={`${getStatusStyle(
              order?.status
            )} px-2 py-1 rounded-full`}
          >
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
