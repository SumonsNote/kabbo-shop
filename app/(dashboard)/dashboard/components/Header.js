import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center ">
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
  );
}
