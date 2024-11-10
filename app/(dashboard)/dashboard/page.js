"use client";
import React from "react";
import { Line } from "react-chartjs-2"; // Assuming you're using Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components required for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Chart.js Data
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: [
          12000, 19000, 3000, 5000, 2000, 30000, 45000, 40000, 22000, 15000,
          25000, 32000,
        ],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="w-full mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of your store&apos;s performance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sales Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900">$320,000</p>
          </div>
          {/* Customers Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-2xl font-bold text-gray-900">8,250</p>
          </div>
          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">15,450</p>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Sales Overview
            </h2>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>New order placed by John Doe</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="flex justify-between">
                <span>New product added: Wireless Headphones</span>
                <span className="text-sm text-gray-500">6 hours ago</span>
              </li>
              <li className="flex justify-between">
                <span>Received payment for Order #4578</span>
                <span className="text-sm text-gray-500">1 day ago</span>
              </li>
              <li className="flex justify-between">
                <span>Discount campaign launched</span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
