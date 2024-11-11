"use client";

import React, { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

// Mock data for the stock items
const stockItems = [
  {
    id: 1,
    name: "Widget A",
    sku: "WA-001",
    quantity: 150,
    price: 19.99,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Gadget B",
    sku: "GB-002",
    quantity: 50,
    price: 49.99,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Tool C",
    sku: "TC-003",
    quantity: 0,
    price: 29.99,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Device D",
    sku: "DD-004",
    quantity: 200,
    price: 99.99,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Product E",
    sku: "PE-005",
    quantity: 75,
    price: 39.99,
    status: "In Stock",
  },
];

export default function StockPage() {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedItems = [...stockItems].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const totalItems = stockItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = stockItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const lowStockItems = stockItems.filter((item) => item.quantity <= 50).length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Stock Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your inventory and stock levels
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-medium text-gray-500">
            Total Stock Items
          </h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {totalItems}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-medium text-gray-500">
            Total Stock Value
          </h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            ${totalValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-medium text-gray-500">Low Stock Items</h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {lowStockItems}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-medium text-gray-500">
            Out of Stock Items
          </h2>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {stockItems.filter((item) => item.quantity === 0).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "SKU", "Quantity", "Price", "Status"].map(
                  (header) => (
                    <th
                      key={header.toLowerCase()}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort(header.toLowerCase())}
                    >
                      <div className="flex items-center">
                        {header}
                        {sortColumn === header.toLowerCase() &&
                          (sortDirection === "asc" ? (
                            <ArrowUpIcon className="w-4 h-4 ml-1" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 ml-1" />
                          ))}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">5</span> of{" "}
                <span className="font-medium">5</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Stock Level Distribution
          </h2>
          <div className="h-64 flex items-end">
            {["In Stock", "Low Stock", "Out of Stock"].map((status, index) => {
              const count = stockItems.filter(
                (item) => item.status === status
              ).length;
              const percentage = (count / stockItems.length) * 100;
              return (
                <div key={status} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full ${
                      index === 0
                        ? "bg-green-500"
                        : index === 1
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ height: `${percentage}%` }}
                  ></div>
                  <span className="text-sm text-gray-500 mt-2">{status}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top 5 Items by Value
          </h2>
          <ul className="space-y-2">
            {stockItems
              .sort((a, b) => b.quantity * b.price - a.quantity * a.price)
              .slice(0, 5)
              .map((item, index) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {index + 1}. {item.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    ${(item.quantity * item.price).toFixed(2)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
