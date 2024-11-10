import React from "react";
import StockProductsItem from "./StockProductsItem";

export default function StockTable({ sortConfig, sortedProducts, handleSort }) {
  return (
    <div className="bg-white dark:bg-inherit rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              ###
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              <div className="flex items-center">Product Image</div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Product Name
                {sortConfig.key === "name" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              <div className="flex items-center">Brand</div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("category")}
            >
              <div className="flex items-center">
                Category
                {sortConfig.key === "category" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center">
                Purchase Price
                {sortConfig.key === "price" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              <div className="flex items-center">
                Quantity
                {sortConfig.key === "stock" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {sortConfig.key === "status" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
          {sortedProducts.map((product, index) => (
            <StockProductsItem key={product.id} stock={product} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
