// ProductItem.js

import { useDeleteProductMutation } from "../../../../../store/slices/productApi";
import { LoaderCircle } from "lucide-react";
import { Fullscreen } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProductItem = ({ product, index }) => {
  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product deleted successfully");
    }
  }, [isSuccess]);

  return (
    <tr
      key={product._id}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-gray-500 capitalize"
    >
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <img src={product?.image[0]?.url} alt="" className="h-16 w-16 " />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.product_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.brand_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{product?.category_name}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            product?.status === "active"
              ? "bg-green-100 text-green-800"
              : product?.status === "inactive"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product?.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`/dashboard/products/${product._id}`}
          className="text-green-600 hover:text-green-500 mr-4 inline-flex items-center gap-2"
        >
          <Fullscreen size={16} /> Details
        </Link>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => deleteProduct(product._id)}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoaderCircle size={16} className="animate-spin" />
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
