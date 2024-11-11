// ProductItem.js

import Link from "next/link";

const StockProductsItem = ({ stock, index }) => {
  return (
    <tr
      key={stock?._id}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-gray-500 capitalize"
    >
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

      <td className="px-6 py-4 whitespace-nowrap">
        <img src={stock?.product?.image[0].url} alt="" className="h-16 w-16" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {stock?.product?.product_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {stock?.product?.brand_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {stock?.product?.category_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{stock?.purchase_price}</td>
      <td className="px-6 py-4 whitespace-nowrap">{stock?.stock}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            stock?.status === "in stock"
              ? "bg-green-100 text-green-800"
              : stock?.status === "low stock"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stock?.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          href={`/dashboard/stock/${stock?._id}`}
          className="text-green-600 hover:text-green-500 mr-4"
        >
          Details
        </Link>
        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
        <button className="text-red-600 hover:text-red-900">Delete</button>
      </td>
    </tr>
  );
};

export default StockProductsItem;
