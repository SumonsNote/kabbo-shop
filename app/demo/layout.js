import Image from "next/image";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-64 px-6 py-8 flex flex-col justify-between fixed left-0 top-0 h-full">
        <div>
          <div className="flex items-center mb-8">
            <svg
              className="w-8 h-8 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="currentColor"
              />
              <path
                d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
                fill="currentColor"
              />
              <path
                d="M12 16C9.33 16 7 17.34 7 19H17C17 17.34 14.67 16 12 16Z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-2xl font-bold">Ecommerce</h1>
          </div>
          <nav>
            <a
              href="#"
              className="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition duration-200"
            >
              <svg
                className="w-6 h-6 mr-3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                  fill="currentColor"
                />
              </svg>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition duration-200"
            >
              <svg
                className="w-6 h-6 mr-3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
                  fill="currentColor"
                />
                <path
                  d="M7 9H17V11H7V9ZM7 13H14V15H7V13Z"
                  fill="currentColor"
                />
              </svg>
              <span>Products</span>
            </a>
            <a
              href="#"
              className="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition duration-200"
            >
              <svg
                className="w-6 h-6 mr-3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 18H21V16H3V18ZM3 13H15V11H3V13ZM3 8H21V6H3V8ZM3 3V5H21V3H3Z"
                  fill="currentColor"
                />
              </svg>
              <span>Orders</span>
            </a>
            <a
              href="#"
              className="flex items-center py-3 px-4 hover:bg-gray-800 rounded-md transition duration-200"
            >
              <svg
                className="w-6 h-6 mr-3"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                  fill="currentColor"
                />
                <path
                  d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
                  fill="currentColor"
                />
                <path
                  d="M12 16C9.33 16 7 17.34 7 19H17C17 17.34 14.67 16 12 16Z"
                  fill="currentColor"
                />
              </svg>
              <span>Customers</span>
            </a>
          </nav>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition duration-200">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-64 right-0">
          <h2 className="text-2xl font-bold">{"Dashboard"}</h2>
          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/profile-pic.jpg"
                width={40}
                height={40}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-gray-400">John Doe</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-2 mt-16">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
