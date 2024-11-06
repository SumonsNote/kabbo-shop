"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavSideBar() {
  const pathname = usePathname();

  // Function to determine if the link is active
  const isActive = (path) => pathname === path;

  return (
    <div className="bg-gray-900 text-white w-64 px-6 py-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-8">
          <Image
            src="/svg/user.svg"
            width={40}
            height={40}
            alt="Profile Pic"
            className="w-8 h-8 text-white rounded-full mr-3"
          />
          <h1 className="text-2xl font-bold">Ecommerce</h1>
        </div>
        <nav>
          <Link
            href="/dashboard"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard") ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
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
          </Link>
          <Link
            href="/dashboard/products"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard/products")
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
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
              <path d="M7 9H17V11H7V9ZM7 13H14V15H7V13Z" fill="currentColor" />
            </svg>
            <span>Products</span>
          </Link>
          <Link
            href="/dashboard/orders"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard/orders")
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
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
          </Link>
          <Link
            href="/dashboard/brands"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard/brands")
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            <svg
              className="w-6 h-6 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 3H7C5.9 3 5 3.9 5 5V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V5C19 3.9 18.1 3 17 3ZM17 21H7V5H17V21ZM9 9H15V11H9V9ZM9 13H15V15H9V13ZM9 17H15V19H9V17Z"
                fill="currentColor"
              />
            </svg>
            <span>Brands</span>
          </Link>
          <Link
            href="/dashboard/customers"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard/customers")
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
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
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard/settings")
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            <svg
              className="w-6 h-6 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 21H8C6.23858 21 5 19.7614 5 18V5C5 3.23858 6.23858 2 8 2H16ZM16 17H8C6.23858 17 5 15.7614 5 1
              C5 13.2386 6.23858 12 8 12H16C17.7614 12 19 13.2386 19 15V18C19 19.7614 17.7614 21 16 21ZM8 14H16C17.7614
              14 15.7614 17.7614 17 16 17H8C6.23858 17 5 15.7614 5 14V12C5 10.2386 6.23858 9 8 9H16C17.7614 9 19 10.2386 19 12
              V14C19 15.7614 17.7614 17 16 17Z"
                fill="currentColor"
              />
            </svg>
            <span>Settings</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard/analytics")
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            <svg
              className="w-6 h-6 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 10.75H3C2.59 10.75 2.25 10.41 2.25 10V6C2.25 5.59 2.59 5.25 3 5.25H21C21.41 5.25 21.75 5.59 21.75 6V10C21.75 10.41 21.41 10.75 21 10.75Z"
                fill="currentColor"
              />
              <path
                d="M21 16.75H3C2.59 16.75 2.25 16.41 2.25 16V12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12V16C21.75 16.41 21.41 16.75 21 16.75Z"
                fill="currentColor"
              />
            </svg>
            <span>Analytics</span>
          </Link>
          <Link
            href="/dashboard/support"
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
              isActive("/dashboard/support")
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            <svg
              className="w-6 h-6 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 10.75H3C2.59 10.75 2.25 10.41 2.25 10V6C2.25 5.59 2.59 5.25 3 5.25H21C21.41 5.25 21.75 5.59 21.75 6V10C21.75 10.41 21.41 10.75 21 10.75Z"
                fill="currentColor"
              />
              <path
                d="M21 16.75H3C2.59 16.75 2.25 16.41 2.25 16V12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12V16C21.75 16.41 21.41 16.75 21 16.75Z"
                fill="currentColor"
              />
            </svg>
            <span>Support</span>
          </Link>
        </nav>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition duration-200">
        Logout
      </button>
    </div>
  );
}
