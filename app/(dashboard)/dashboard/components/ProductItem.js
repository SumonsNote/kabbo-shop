// ProductItem.js

const ProductItem = ({ product }) => {
  console.log(product);
  return (
    <tr key={product._id} className="hover:bg-gray-50 text-black">
      <td className="px-6 py-4 whitespace-nowrap">
        {product.productId.product_name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {product.productId.brandId.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        ${product.productId.price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {product.productId.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            product.productId.status === "in stock"
              ? "bg-green-100 text-green-800"
              : product.productId.status === "low stock"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.productId.status}
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
