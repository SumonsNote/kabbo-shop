"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineApple,
  AiOutlineDollarCircle,
  AiOutlineQuestionCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { DiSmashingMagazine } from "react-icons/di";
import {
  FaAirbnb,
  FaDashcube,
  FaRegCircleUser,
  FaShopify,
  FaStore,
  FaUser,
} from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { MdCategory, MdOutlinePhoneIphone } from "react-icons/md";
import DarkMood from "./ui/DarkMood";

import { logout } from "@/app/actions";
import Image from "next/image";

export default function NavSideBar({ setIsCollapsed, isCollapsed }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      href: "/dashboard",
      icon: <FaDashcube className="w-6 h-6" />,
      label: "Dashboard",
    },
    {
      href: "/dashboard/user",
      icon: <FaUser className="w-6 h-6" />,
      label: "Users",
    },
    {
      href: "/dashboard/category",
      icon: <MdCategory className="w-6 h-6" />,
      label: "Category",
    },
    {
      href: "/dashboard/brands",
      icon: <AiOutlineApple className="w-6 h-6" />,
      label: "Brands",
    },
    {
      href: "/dashboard/products",
      icon: <MdOutlinePhoneIphone className="w-6 h-6" />,
      label: "Products",
    },
    {
      href: "/dashboard/banners",
      icon: <FaAirbnb className="w-6 h-6" />,
      label: "Banners",
    },
    {
      href: "/dashboard/orders",
      icon: <FaShopify className="w-6 h-6" />,
      label: "Orders",
    },
  ];

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <div
      className={`bg-gray-900 relative text-white ${
        isCollapsed ? "xl:w-20 w-0 hidden sm:flex px-2" : "xl:w-64 px-5"
      }  flex flex-col duration-300`}
    >
      <div className="flex items-center h-36 cursor-pointer ">
        <Image
          width={175}
          height={25}
          alt="logo"
          src={
            "https://www.kabbomobileshop.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkabbo%20mobile%20shop.38c0cff1.png&w=256&q=75"
          }
        />
      </div>
      <nav className="max-h-[60vh] overflow-y-auto ">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center py-3 px-4 rounded-md transition duration-200 dark:text-gray-500 ${
              (
                href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.includes(href)
              )
                ? "bg-gray-800 dark:bg-gray-950 "
                : " hover:bg-gray-800 dark:hover:bg-gray-950"
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
      <div className="space-y-4 absolute bottom-0 left-0  p-2 h-32   bg-gray-900 w-full">
        <DarkMood isCollapsed={isCollapsed} />
        {session?.user?.id && (
          <button
            onClick={handleSignOut}
            className="bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 text-white dark:text-gray-400 py-3 px-4 rounded-md transition duration-200 flex items-center overflow-hidden"
          >
            <IoLogOut className="w-6 h-6" />
            {!isCollapsed && <span className="ml-4">Logout</span>}
          </button>
        )}
      </div>
    </div>
  );
}
