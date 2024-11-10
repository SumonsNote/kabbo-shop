import NumberFlow from "@number-flow/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchCustomer({
  setSearchQuery,
  searchQuery,
  customers,
}) {
  console.log(customers);
  const totalCustomers = customers.length;
  const activeCustomer = customers.filter((c) => c.status === "active").length;

  const totalSpent = customers.reduce((grandTotal, customer) => {
    return (
      grandTotal +
      customer.orderId
        .filter(
          (order) => order.status === "Paid" || order.status === "Delivered"
        )
        .reduce((total, order) => total + (Number(order.total_amount) || 0), 0)
    );
  }, 0);
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></AiOutlineSearch>
          <input
            type="text"
            placeholder="Search customers by name or email..."
            className="pl-10 w-full bg-inherit rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
          <p className="mt-2 text-3xl font-bold text-gray-500">
            <NumberFlow
              value={totalCustomers}
              format={{ notation: "compact" }} // Intl.NumberFormat options
              locales="en-US" // Intl.NumberFormat locales
            />
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">
            Active Customers
          </h3>
          <p className="mt-2 text-3xl font-bold text-gray-500">
            <NumberFlow
              value={activeCustomer}
              format={{ notation: "compact" }} // Intl.NumberFormat options
              locales="en-US" // Intl.NumberFormat locales
            />
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-gray-500">
            $
            <NumberFlow
              value={totalSpent}
              format={{ notation: "compact" }} // Intl.NumberFormat options
              locales="en-US" // Intl.NumberFormat locales
            />
          </p>
        </div>
      </div>
    </div>
  );
}
