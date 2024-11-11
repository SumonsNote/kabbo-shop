"use client";
import { useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export default function UserDashboard() {
  useEffect(() => {
    // Initialize charts
    const userGrowthChart = new ChartJS(
      document.getElementById("userGrowthChart"),
      {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "User Growth",
              data: [1200, 1400, 1600, 1800, 2200, 2543],
              borderColor: "rgb(59, 130, 246)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "User Growth Over Time",
            },
          },
        },
      }
    );

    const userActivityChart = new ChartJS(
      document.getElementById("userActivityChart"),
      {
        type: "bar",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Daily Active Users",
              data: [1200, 1300, 1400, 1200, 1100, 900, 800],
              backgroundColor: "rgb(147, 51, 234)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Daily Active Users",
            },
          },
        },
      }
    );

    // Cleanup
    return () => {
      userGrowthChart.destroy();
      userActivityChart.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Analytics Section */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-800/70 p-4 rounded-lg">
              <h3 className="text-blue-600 font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">2,543</p>
            </div>
            <div className="bg-green-50 dark:bg-green-800/70 p-4 rounded-lg">
              <h3 className="text-green-600 font-semibold">Active Users</h3>
              <p className="text-2xl font-bold">1,879</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-800/70 p-4 rounded-lg">
              <h3 className="text-purple-600 font-semibold">New Users</h3>
              <p className="text-2xl font-bold">145</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-800/70 p-4 rounded-lg">
              <h3 className="text-orange-600 font-semibold">Conversion Rate</h3>
              <p className="text-2xl font-bold">64%</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            <canvas id="userGrowthChart"></canvas>
          </div>
          <div className="bg-white dark:bg-gray-900  p-4 rounded-lg shadow">
            <canvas id="userActivityChart"></canvas>
          </div>
        </div>

        {/* User List Section */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">User List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-2  00"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          John Doe
                        </div>
                        <div className="text-sm text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Admin
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2 minutes ago
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
