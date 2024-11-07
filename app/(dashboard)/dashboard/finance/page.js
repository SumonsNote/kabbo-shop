"use client";
import React, { useState } from "react";

const AccountsDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
    },
    {
      title: "Expenses",
      value: "$12,234.45",
      change: "+4.5%",
      trend: "up",
    },
    {
      title: "Net Profit",
      value: "$32,997.44",
      change: "+18.2%",
      trend: "up",
    },
    {
      title: "Revenue per Order",
      value: "$48.50",
      change: "-2.3%",
      trend: "down",
    },
  ];

  const transactions = [
    {
      id: 1,
      date: "2024-03-15",
      description: "Order #1234",
      amount: 156.0,
      type: "income",
    },
    {
      id: 2,
      date: "2024-03-14",
      description: "Supplier Payment",
      amount: -430.5,
      type: "expense",
    },
    {
      id: 3,
      date: "2024-03-14",
      description: "Order #1233",
      amount: 245.0,
      type: "income",
    },
    {
      id: 4,
      date: "2024-03-13",
      description: "Marketing Costs",
      amount: -120.0,
      type: "expense",
    },
    {
      id: 5,
      date: "2024-03-13",
      description: "Order #1232",
      amount: 189.5,
      type: "income",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <p className="text-gray-500">
          Track your business performance and financial metrics
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {["overview", "transactions", "invoices", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              } capitalize`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="text-sm font-medium text-gray-500">
              {metric.title}
            </h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </p>
              <span
                className={`ml-2 text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
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

export default AccountsDashboard;
