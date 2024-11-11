"use client";
import React, { useState } from "react";
import {
  Users,
  UserPlus,
  UserMinus,
  Activity,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomerAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample customer activity data
  const activityData = [
    { month: "Jan", active: 65 },
    { month: "Feb", active: 75 },
    { month: "Mar", active: 85 },
    { month: "Apr", active: 82 },
    { month: "May", active: 90 },
    { month: "Jun", active: 95 },
  ];

  // Sample customers data
  const customers = [
    {
      id: 1,
      name: "Emma Thompson",
      email: "emma@example.com",
      totalSpent: 2499.99,
      lastPurchase: "2024-03-15",
      status: "active",
      orders: 12,
      loyalty: "gold",
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james@example.com",
      totalSpent: 1899.5,
      lastPurchase: "2024-03-10",
      status: "inactive",
      orders: 8,
      loyalty: "silver",
    },
    {
      id: 3,
      name: "Sarah Chen",
      email: "sarah@example.com",
      totalSpent: 3299.99,
      lastPurchase: "2024-03-18",
      status: "active",
      orders: 15,
      loyalty: "platinum",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael@example.com",
      totalSpent: 899.99,
      lastPurchase: "2024-02-28",
      status: "at_risk",
      orders: 4,
      loyalty: "bronze",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      at_risk: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getLoyaltyColor = (loyalty) => {
    const colors = {
      platinum: "bg-purple-100 text-purple-800",
      gold: "bg-yellow-100 text-yellow-800",
      silver: "bg-gray-100 text-gray-800",
      bronze: "bg-orange-100 text-orange-800",
    };
    return colors[loyalty] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Analytics</h1>
        <p className="text-gray-600 mt-2">
          Track and analyze your customer base
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Customers
              </p>
              <p className="text-2xl font-bold mt-1">1,240</p>
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm ml-1">12% increase</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Customers</p>
              <p className="text-2xl font-bold mt-1">145</p>
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm ml-1">8% increase</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Churned Customers
              </p>
              <p className="text-2xl font-bold mt-1">32</p>
              <div className="flex items-center mt-2 text-red-600">
                <ArrowDownRight className="h-4 w-4" />
                <span className="text-sm ml-1">2% increase</span>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <UserMinus className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold mt-1">892</p>
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm ml-1">5% increase</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Activity Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Customer Activity Trend</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="active" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-semibold">Customer List</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                  Loyalty
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">
                  Total Spent
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">
                  Orders
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                  Last Purchase
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">
                        {customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLoyaltyColor(
                        customer.loyalty
                      )}`}
                    >
                      {customer.loyalty}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium">
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right font-medium">
                    {customer.orders}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(customer.lastPurchase).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
