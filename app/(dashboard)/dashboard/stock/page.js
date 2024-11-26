"use client";
import { useFetchStocksQuery } from "@/store/slices/stockApi";
import Link from "next/link";
import { useState } from "react";
import Loading from "../components/Loading";
import NoDataFound from "../components/NoDataFound";
import StockFilters from "./_components/StockFilters";
import StockTable from "./_components/StockTable";

const ProductDashboard = () => {
  const { data, isLoading } = useFetchStocksQuery();
  const products = data?.stocks || [];
  // State for search, filters, and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  // Filter products based on search term and filters

  const filteredProducts = products.filter((stock) => {
    const matchesSearch = stock?.product?.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" ||
      stock.product.category_name === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || stock.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Handle sort
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6 text-gray-500">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-blue-500 dark:bg-blue-800 hover:bg-blue-600 text-white dark:text-gray-300 px-4 py-2 rounded-md transition duration-200">
          <Link href="/dashboard/stock/add"> Add New Stock</Link>
        </button>
      </div>

      {/* Filters and Search Section */}
      <StockFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Products Table */}

      {sortedProducts.length === 0 ? (
        <NoDataFound title={"Stock"} />
      ) : (
        <StockTable
          handleSort={handleSort}
          sortConfig={sortConfig}
          sortedProducts={sortedProducts}
        />
      )}
    </div>
  );
};

export default ProductDashboard;
