// ProductItem.js

const ProductItem = ({ product }) => {
  return (
    <tr key={product._id} className="hover:bg-gray-50 text-black">
      <td className="px-6 py-4 whitespace-nowrap">{product.product_name}</td>
      <td className="px-6 py-4 whitespace-nowrap">Smarphone</td>
      <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
      <td className="px-6 py-4 whitespace-nowrap">In Stock</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            product.status === "in stock"
              ? "bg-green-100 text-green-800"
              : product.status === "low stock"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
        <button className="text-red-600 hover:text-red-900">Delete</button>
      </td>
    </tr>
  );
};

export default ProductItem;
