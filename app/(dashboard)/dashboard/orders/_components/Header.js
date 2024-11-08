import React from "react";

export default function OrderHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track your orders</p>
      </div>
      <div className="flex gap-4">
        <button className="bg-white dark:bg-gray-800 dark:text-gray-500 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition duration-200">
          Export
        </button>
        <button className="bg-blue-500 dark:bg-blue-700 dark:text-gray-300 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200">
          Create Order
        </button>
      </div>
    </div>
  );
}
