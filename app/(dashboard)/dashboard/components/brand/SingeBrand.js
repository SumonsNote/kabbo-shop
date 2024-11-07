import Image from "next/image";
import React from "react";

export default function SingeBrand({ brand, i }) {
  return (
    <tr key={brand.id} className="hover:bg-gray-50 capitalize">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {i + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <Image src={brand.logo} width={50} height={50} alt="Logo" />
      </td>{" "}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {brand.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {brand.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            brand.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {brand.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Edit
        </button>
      </td>
    </tr>
  );
}
