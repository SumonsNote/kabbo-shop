import Link from "next/link";
import React from "react";

export default function OrderTable({ handleSort, sortConfig, sortedOrders }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                Order ID
                {sortConfig.key === "id" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("customer")}
            >
              <div className="flex items-center">
                Customer
                {sortConfig.key === "customer" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date
                {sortConfig.key === "date" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("total")}
            >
              <div className="flex items-center">
                Total
                {sortConfig.key === "total" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
          {sortedOrders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {order.order_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order?.customer?.userId?.first_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${order.total_amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.items.reduce((total, item) => total + item.quantity, 0)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap`}>
                {order.payment_info.status}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/dashboard/orders/${order._id}`}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  View
                </Link>
                <button className="text-gray-600 hover:text-gray-900">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Status badge styling
const getStatusStyle = (status) => {
  const styles = {
    Delivered: "bg-green-100 text-green-800",
    Processing: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-purple-100 text-purple-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return styles[status] || "bg-gray-100 text-gray-800";
};
