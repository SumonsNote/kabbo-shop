"use client";
import React from "react";
import { FiPackage, FiTrendingUp, FiAlertCircle, FiStar } from "react-icons/fi";

const ProductDashboard = () => {
  // Demo data
  const metrics = {
    newProducts: {
      count: 24,
      trend: "+12%",
      period: "vs last month",
      items: [
        {
          id: 1,
          name: "Wireless Earbuds Pro",
          date: "2023-07-15",
          price: "$129.99",
        },
        {
          id: 2,
          name: "Smart Watch Elite",
          date: "2023-07-14",
          price: "$199.99",
        },
        {
          id: 3,
          name: "Gaming Mouse RGB",
          date: "2023-07-13",
          price: "$79.99",
        },
      ],
    },
    totalProducts: {
      count: 1567,
      active: 1489,
      inactive: 78,
      categories: {
        Electronics: 456,
        Fashion: 389,
        Home: 298,
        Sports: 424,
      },
    },
    stockOut: {
      count: 15,
      critical: 8,
      items: [
        {
          id: 1,
          name: "Gaming Laptop Pro",
          lastSold: "2023-07-15",
          demand: "High",
        },
        {
          id: 2,
          name: "Bluetooth Speaker",
          lastSold: "2023-07-14",
          demand: "Medium",
        },
        {
          id: 3,
          name: "Fitness Tracker",
          lastSold: "2023-07-13",
          demand: "High",
        },
      ],
    },
    bestSelling: {
      items: [
        { id: 1, name: "Smartphone X", sales: 1234, revenue: "$617,000" },
        { id: 2, name: "Laptop Pro", sales: 856, revenue: "$942,000" },
        { id: 3, name: "Wireless Headphones", sales: 723, revenue: "$108,450" },
      ],
    },
    allProducts: [
      {
        id: 1,
        name: "Wireless Earbuds Pro",
        category: "Electronics",
        price: "$129.99",
        stock: 50,
        brand: "Apple",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Smart Watch Elite",
        category: "Electronics",
        price: "$199.99",
        stock: 30,
        brand: "Samsung",
        rating: 4.2,
      },
      {
        id: 3,
        name: "Gaming Mouse RGB",
        category: "Electronics",
        price: "$79.99",
        stock: 20,
        brand: "Logitech",
        rating: 4.3,
      },
      {
        id: 4,
        name: "Wireless Earbuds Pro",
        category: "Electronics",
        price: "$129.99",
        stock: 50,
        brand: "Apple",
        rating: 4.5,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* New Products Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">New Products</h3>
              <p className="text-3xl font-bold mt-2">
                {metrics.newProducts.count}
              </p>
            </div>
            <FiPackage className="text-blue-500 text-3xl" />
          </div>
          <div className="text-sm text-green-600">
            {metrics.newProducts.trend} {metrics.newProducts.period}
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-3xl font-bold mt-2">
                {metrics.totalProducts.count}
              </p>
            </div>
            <FiTrendingUp className="text-purple-500 text-3xl" />
          </div>
          <div className="text-sm">
            <span className="text-green-600">
              {metrics.totalProducts.active} active
            </span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-red-500">
              {metrics.totalProducts.inactive} inactive
            </span>
          </div>
        </div>

        {/* Stock Out Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Stock Out</h3>
              <p className="text-3xl font-bold mt-2">
                {metrics.stockOut.count}
              </p>
            </div>
            <FiAlertCircle className="text-red-500 text-3xl" />
          </div>
          <div className="text-sm text-red-600">
            {metrics.stockOut.critical} critical items
          </div>
        </div>

        {/* Best Selling Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Best Selling</h3>
              <p className="text-3xl font-bold mt-2">
                {metrics.bestSelling.items[0].sales}
              </p>
            </div>
            <FiStar className="text-yellow-500 text-3xl" />
          </div>
          <div className="text-sm text-yellow-600">
            Top seller: {metrics.bestSelling.items[0].name}
          </div>
        </div>
      </div>

      {/* Detailed Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* New Products List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Date Added</th>
                  <th className="text-left py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {metrics.newProducts.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.date}</td>
                    <td className="py-2">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Out List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Stock Out Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Last Sold</th>
                  <th className="text-left py-2">Demand</th>
                </tr>
              </thead>
              <tbody>
                {metrics.stockOut.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.lastSold}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.demand === "High"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.demand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* All Products List */}
        <div className="bg-white rounded-lg shadow p-6 col-span-2">
          <h3 className="text-lg font-semibold mb-4">All Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Stock</th>
                  <th className="text-left py-2">brand</th>
                  <th className="text-left py-2">rating</th>
                </tr>
              </thead>
              <tbody>
                {metrics.allProducts.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.category}</td>
                    <td className="py-2">{item.price}</td>
                    <td className="py-2">{item.stock}</td>
                    <td className="py-2">{item.brand}</td>
                    <td className="py-2">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
