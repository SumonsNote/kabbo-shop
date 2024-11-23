"use client";

import Link from "next/link";
import { useState } from "react";

import { useFetchProductsQuery } from "../../../../store/slices/productApi";
import Loading from "../components/Loading";
import NoDataFound from "../components/NoDataFound";
import ProductsFilters from "./_components/ProductsFilters";
import ProductTable from "./_components/ProductTable";

const ProductDashboard = () => {
  const { data, isLoading, isError, error } = useFetchProductsQuery();

  const products = data?.products || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  if (isLoading) {
    return <Loading />;
  }
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product?.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product?.category_name === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || product.status == statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-6 text-gray-500">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-4">
          <div className="flex gap-4">
            <button className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white dark:text-gray-300 px-4 py-2 rounded-md transition duration-200">
              <Link href="/dashboard/products/oldlist">Old Products</Link>
            </button>

            <button className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white dark:text-gray-300 px-4 py-2 rounded-md transition duration-200">
              <Link href="/dashboard/products/new"> Add old Product</Link>
            </button>
            <button className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white dark:text-gray-300 px-4 py-2 rounded-md transition duration-200">
              <Link href="/dashboard/products/add"> Add New Product</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <ProductsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Products Table */}

      {filteredProducts.length === 0 ? (
        <NoDataFound title="Products" />
      ) : (
        <ProductTable sortedProducts={filteredProducts} />
      )}
    </div>
  );
};

export default ProductDashboard;
