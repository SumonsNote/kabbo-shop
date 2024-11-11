import NumberFlow from "@number-flow/react";
import React from "react";

export default function CustomerStats({ customers }) {
  const totalCustomers = customers.length;
  const activeCustomer = customers.filter((c) => c.status === "active").length;

  const totalSpent = customers.reduce((grandTotal, customer) => {
    return (
      grandTotal +
      customer.order
        .filter(
          (order) => order.status === "Paid" || order.status === "Delivered"
        )
        .reduce((total, order) => total + (Number(order.total_amount) || 0), 0)
    );
  }, 0);
  // Render CustomerStats component here

  return (
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
        <h3 className="text-sm font-medium text-gray-500">Active Customers</h3>
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
  );
}
