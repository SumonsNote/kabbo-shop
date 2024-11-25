import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, Eye } from "lucide-react";

export default function PhonesTable({ data }) {
  const [iphones, setIphones] = useState(data);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`/api/iphones/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setIphones(iphones.filter((iphone) => iphone._id !== id));
        }
      } catch (error) {
        console.error("Error deleting iPhone:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Storage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {iphones.map((iphone) => (
            <tr key={iphone._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={iphone.images[0]}
                  alt={iphone.name}
                  className="h-12 w-12 object-cover rounded-md"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{iphone.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{iphone.model}</td>
              <td className="px-6 py-4 whitespace-nowrap">${iphone.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{iphone.storage}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    iphone.isUsed
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {iphone.isUsed ? "Used" : "New"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Link href={`/dashboard/products/oldlist/${iphone._id}`}>
                  <Eye className="w-5 h-5 text-blue-600 cursor-pointer" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
