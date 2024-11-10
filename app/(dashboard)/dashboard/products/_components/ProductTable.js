import React from "react";
import ProductItem from "../../components/ProductItem";

export default function ProductTable({ sortedProducts, handleSort }) {
  console.log(sortedProducts);
  return (
    <div className=" rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th>###</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              <div className="flex items-center">Product Image</div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              <div className="flex items-center">Product Name</div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              <div className="flex items-center">Brand</div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              <div className="flex items-center">Category</div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              <div className="flex items-center">Status</div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800  divide-y divide-gray-200">
          {sortedProducts.map((product, i) => (
            <ProductItem key={product._id} product={product} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
