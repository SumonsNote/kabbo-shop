"use client";

import Link from "next/link";

import { useFetchProductsQuery } from "@/store/slices/productApi";
import {
  FaBoxesPacking,
  FaChartLine,
  FaDollarSign,
  FaMobile,
} from "react-icons/fa6";
import PhonesTable from "./components/ProductTable";
import ProductsFilters from "./components/ProductsFilters";
const ProductDashboard = () => {
  const { data, isLoading, isError, error } = useFetchProductsQuery();

  const products = data?.products || [];
  if (isLoading) return <DashboardSkeleton />;
  const analytics = {
    totalProducts: products.length,
    totalValue: products.reduce(
      (acc, product) => acc + Number(product.price),
      0
    ),
    lowStock: products.filter((product) => product.stock < 10).length,
    topSelling: products[0]?.name || "N/A",
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Dashboard</h1>
        <Link
          href="/dashboard/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <FaBoxesPacking /> Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticCard
          title="Total Products"
          value={analytics.totalProducts}
          icon={<FaBoxesPacking />}
          color="bg-blue-500"
        />
        <AnalyticCard
          title="Total Value"
          value={`৳${analytics.totalValue.toLocaleString()}`}
          icon={<FaDollarSign />}
          color="bg-green-500"
        />
        <AnalyticCard
          title="Low Stock Items"
          value={analytics.lowStock}
          icon={<FaChartLine />}
          color="bg-yellow-500"
        />
        <AnalyticCard
          title="Top Selling"
          value={analytics.topSelling}
          icon={<FaMobile />}
          color="bg-purple-500"
        />
      </div>
      <ProductsFilters data={products} />
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* <ProductsTable products={products} /> */}
        <PhonesTable data={products} />
      </div>
    </div>
  );
};

export default ProductDashboard;

const DashboardSkeleton = () => (
  <div className="p-6 space-y-6 w-full">
    <div className="flex justify-between items-center">
      <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse" />
      <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
    <div className="h-[400px] bg-gray-200 rounded-lg animate-pulse" />
  </div>
);

const AnalyticCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-4">
      <div className={`p-4 rounded-full ${color} text-white`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);
