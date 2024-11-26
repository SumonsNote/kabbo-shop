"use client";
import Image from "next/image";
import BackButton from "../../components/ui/BackButton";
import { useParams } from "next/navigation";
import { useFetchSingleStockQuery } from "@/store/slices/stockApi";
import Loading from "../../components/Loading";

const ProductStockDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchSingleStockQuery(id);
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }
  const { product, stock, dealer, sold_out, variants, status, sku } =
    data?.stock;

  const getStockStatusColor = (status) => {
    const statusColors = {
      "low-stock": "bg-yellow-100 text-yellow-800",
      "in-stock": "bg-green-100 text-green-800",
      "out-of-stock": "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full mx-auto p-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg">
      <BackButton />
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-500">
            {product.product_name}
          </h1>
          <p className="text-gray-600">SKU: {sku}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(
            status
          )}`}
        >
          {status.replace("-", " ").toUpperCase()}
        </span>
      </div>

      {/* Product Images */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {product.image.map((img) => (
          <div
            key={img._id}
            className="size-72 relative bg-gradient-to-t  from-indigo-50 dark:from-pink-950 to-pink-50 dark:to-gray-900 rounded-lg overflow-hidden flex items-center justify-center "
          >
            <Image
              width={250}
              height={250}
              src={img.url}
              alt={img.colors}
              className="object-cover rounded-lg "
            />
            <span className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-400 px-3 py-1 rounded-full text-sm capitalize">
              {img.colors}
            </span>
          </div>
        ))}
      </div>

      {/* Stock Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900">Current Stock</h3>
          <p className="text-3xl font-bold text-blue-600">{stock}</p>
        </div>
        <div className="bg-green-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900">Sold Units</h3>
          <p className="text-3xl font-bold text-green-600">{sold_out}</p>
        </div>
        <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900">Dealer</h3>
          <p className="text-3xl font-bold text-purple-600">{dealer}</p>
        </div>
      </div>

      {/* Pricing Information */}
      {/* <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Average Pricing Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <p className="text-gray-600">Selling Price</p>
            <p className="text-2xl font-bold text-green-600">
              ${sell_price.toLocaleString()}
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <p className="text-gray-600">Purchase Price</p>
            <p className="text-2xl font-bold text-blue-600">
              ${purchase_price.toLocaleString()}
            </p>
          </div>
        </div>
      </div> */}

      {/* Variants Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Storage Variants & Regional Pricing
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Storage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Purchase Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Discount Price
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 dark:text-gray-500 divide-y divide-gray-200 dark:divide-gray-700">
              {variants.map((variant) =>
                variant.regional_pricing.map((pricing, idx) => (
                  <tr key={pricing._id}>
                    {idx === 0 && (
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        rowSpan={variant.regional_pricing.length}
                      >
                        {variant.storage.size} {variant.storage.unit}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pricing.region.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pricing.region.currency_symbol}
                      {pricing.purchase_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pricing.region.currency_symbol}
                      {pricing.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pricing.region.currency_symbol}
                      {pricing.discount_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pricing.stock_quantity}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductStockDetails;
