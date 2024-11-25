"use client";

import Link from "next/link";

import { useFetchOldProductsQuery } from "../../../../../store/slices/productApi";
import PhonesTable from "./components/ProductTable";
const ProductDashboard = () => {
  const { data, isLoading, isError, error } = useFetchOldProductsQuery();

  const products = data?.products || [];
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 text-gray-500">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-4">
          <button className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white dark:text-gray-300 px-4 py-2 rounded-md transition duration-200">
            <Link href="/dashboard/products/new"> Add old Product</Link>
          </button>
          <button className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white dark:text-gray-300 px-4 py-2 rounded-md transition duration-200">
            <Link href="/dashboard/products/add"> Add New Product</Link>
          </button>
        </div>
      </div>
      <PhonesTable data={products} />
    </div>
  );
};

export default ProductDashboard;
