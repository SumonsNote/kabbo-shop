"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineApple,
  AiOutlineBarChart,
  AiOutlineDollarCircle,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaDashcube, FaRegCircleUser, FaShopify } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { DiSmashingMagazine } from "react-icons/di";
import { useState } from "react";

export default function NavSideBar({ setIsCollapsed, isCollapsed }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      href: "/dashboard",
      icon: <FaDashcube className="w-6 h-6" />,
      label: "Dashboard",
    },
    {
      href: "/dashboard/products",
      icon: <MdOutlinePhoneIphone className="w-6 h-6" />,
      label: "Products",
    },
    {
      href: "/dashboard/orders",
      icon: <FaShopify className="w-6 h-6" />,
      label: "Orders",
    },
    {
      href: "/dashboard/brands",
      icon: <AiOutlineApple className="w-6 h-6" />,
      label: "Brands",
    },
    {
      href: "/dashboard/customers",
      icon: <FaRegCircleUser className="w-6 h-6" />,
      label: "Customers",
    },
    {
      href: "/dashboard/settings",
      icon: <AiOutlineSetting className="w-6 h-6" />,
      label: "Settings",
    },
    {
      href: "/dashboard/analytics",
      icon: <AiOutlineBarChart className="w-6 h-6" />,
      label: "Analytics",
    },
    {
      href: "/dashboard/support",
      icon: <AiOutlineQuestionCircle className="w-6 h-6" />,
      label: "Support",
    },
    {
      href: "/dashboard/finance",
      icon: <AiOutlineDollarCircle className="w-6 h-6" />,
      label: "Finance",
    },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div
      className={`bg-gray-900 text-white ${
        isCollapsed ? "w-28" : "w-64"
      } 4 px-6 py-8 flex flex-col justify-between duration-300`}
    >
      <div>
        <div
          className="flex items-center mb-8 cursor-pointer w-[200px]"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <DiSmashingMagazine className="w-10 h-10 mr-3 text-sky-300" />
          {!isCollapsed && <h1 className="text-2xl font-bold">Ecommerce</h1>}
        </div>
        <nav>
          {navItems.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center py-3 px-4 rounded-md transition duration-200 ${
                isActive(href) ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
            >
              <div
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "justify-start"
                }`}
              >
                {icon}
                {!isCollapsed && <span className="ml-4">{label}</span>}
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition duration-200"
        onClick={() => router.push("/logout")}
      >
        Logout
      </button>
    </div>
  );
}
