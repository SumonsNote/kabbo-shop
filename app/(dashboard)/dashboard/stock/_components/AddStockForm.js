"use client";

import React, { useEffect, useState } from "react";
import { PlusCircle, MinusCircle, Loader2 } from "lucide-react";
import SearchableDropdown from "../../components/ui/SearchableDropdown";
import { Trash2 } from "lucide-react";
import {
  useAddStockMutation,
  useUpdateStockMutation,
} from "@/store/slices/stockApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import BackButton from "../../components/ui/BackButton";

export default function AddStockForm({ stock, isEdit }) {
  const router = useRouter();
  const [addStock, { isLoading, isSuccess: addSuccess, isError: addError }] =
    useAddStockMutation();
  const [
    updateStock,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateStockMutation();
  const [stockData, setStockData] = useState({
    id: stock?._id || "",
    product: stock?.product?._id || "",
    sku: stock?.sku || "",
    dealer: stock?.dealer || "",
    sold_out: stock?.sold_out || 0,
    stock: stock?.stock || 0,
    variants: stock?.variants?.map((variant) => ({
      storage: {
        size: variant.storage?.size || 0,
        unit: variant.storage?.unit || "GB",
      },
      regional_pricing: variant.regional_pricing?.map((pricing) => ({
        region: {
          name: pricing.region?.name || "",
          currency_code: pricing.region?.currency_code || "",
          currency_symbol: pricing.region?.currency_symbol || "",
        },
        price: pricing.price || 0,
        discount_price: pricing.discount_price || 0,
        purchase_price: pricing.purchase_price || 0,
        stock_quantity: pricing.stock_quantity || 0,
      })) || [
        {
          region: { name: "", currency_code: "", currency_symbol: "" },
          price: 0,
          purchase_price: 0,
          discount_price: 0,
          stock_quantity: 0,
        },
      ],
    })) || [
      {
        storage: { size: 0, unit: "GB" },
        regional_pricing: [
          {
            region: { name: "", currency_code: "", currency_symbol: "" },
            price: 0,
            purchase_price: 0,
            discount_price: 0,
            stock_quantity: 0,
          },
        ],
      },
    ],
    status: stock?.status || "in-stock",
  });
  const regions = [
    { code: "SG", name: "Singapore" },
    { code: "VN", name: "Vietnam" },
    { code: "AE", name: "United Arab Emirates (Dubai)" },
    { code: "US", name: "United States" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "MX", name: "Mexico" },
    { code: "BR", name: "Brazil" },
    { code: "RU", name: "Russia" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "TR", name: "Turkey" },
    { code: "TH", name: "Thailand" },
    { code: "MY", name: "Malaysia" },
    { code: "ID", name: "Indonesia" },
    { code: "NL", name: "Netherlands" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "ZA", name: "South Africa" },
    { code: "NZ", name: "New Zealand" },
    { code: "PH", name: "Philippines" },
    { code: "PK", name: "Pakistan" },
    { code: "BD", name: "Bangladesh" },
    { code: "EG", name: "Egypt" },
    { code: "AR", name: "Argentina" },
    { code: "CO", name: "Colombia" },
    { code: "NG", name: "Nigeria" },
  ];

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setStockData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...stockData.variants];
    newVariants[index].storage[field] = value;
    setStockData((prev) => ({ ...prev, variants: newVariants }));
  };

  const handleRegionalPricingChange = (
    variantIndex,
    priceIndex,
    field,
    value
  ) => {
    const newVariants = [...stockData.variants];
    if (field.startsWith("region.")) {
      const regionField = field.split(".")[1];
      newVariants[variantIndex].regional_pricing[priceIndex].region[
        regionField
      ] = value;
    } else {
      newVariants[variantIndex].regional_pricing[priceIndex][field] = value;
    }
    setStockData((prev) => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setStockData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          storage: { size: 0, unit: "GB" },
          regional_pricing: [
            {
              region: { name: "", currency_code: "", currency_symbol: "" },
              price: 0,
              purchase_price: 0,
              discount_price: 0,
              stock_quantity: 0,
            },
          ],
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    setStockData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const addRegionalPricing = (variantIndex) => {
    const newVariants = [...stockData.variants];
    newVariants[variantIndex].regional_pricing.push({
      region: { name: "", currency_code: "", currency_symbol: "" },
      price: 0,
      purchase_price: 0,
      discount_price: 0,
      stock_quantity: 0,
    });
    setStockData((prev) => ({ ...prev, variants: newVariants }));
  };

  const removeRegionalPricing = (variantIndex, priceIndex) => {
    const newVariants = [...stockData.variants];
    newVariants[variantIndex].regional_pricing = newVariants[
      variantIndex
    ].regional_pricing.filter((_, i) => i !== priceIndex);
    setStockData((prev) => ({ ...prev, variants: newVariants }));
  };
  useEffect(() => {
    if (addSuccess) {
      toast.success("Stock added successfully!");
      router.refresh();
      router.back();
    } else if (updateSuccess) {
      toast.success("Stock updated successfully!");
      router.refresh();
      router.back();
    }

    if (addError) {
      toast.error(
        `Failed to add Stock: ${addError.message || "Unknown error occurred"}`
      );
    } else if (updateError) {
      toast.error(
        `Failed to update Stock: ${
          updateError.message || "Unknown error occurred"
        }`
      );
    }
  }, [addSuccess, addError, updateSuccess, updateError]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", stockData);
    isEdit ? updateStock(stockData) : addStock(stockData);
  };
  const handleChange = (option) => {
    setStockData((prev) => ({ ...prev, product: option._id }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-500 mb-8">
            {isEdit ? "Edit" : "Add"} Stock Item
          </h1>
          <BackButton />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden"
        >
          <div className="p-6 space-y-6">
            {/* Main Stock Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Product
                </label>
                {isEdit ? (
                  <div
                    type="input"
                    id="product"
                    className="w-full px-3 py-2 border bg-slate-400 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {stock.product.product_name}
                  </div>
                ) : (
                  <SearchableDropdown
                    value={stockData.product}
                    onChange={handleChange}
                    onBlur={() => console.log("Dropdown blurred")}
                    placeholder="Search for an option"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    containerClassName=""
                    optionClassName=" bg-gray-100 hover:bg-gray-200"
                    optionActiveClassName="bg-primary-500 text-white"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={stockData.sku}
                  onChange={handleinputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={stockData.stock}
                  onChange={handleinputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="dealer"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Dealer
                </label>
                <input
                  type="text"
                  id="dealer"
                  name="dealer"
                  value={stockData.dealer}
                  onChange={handleinputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={stockData?.status}
                  onChange={handleinputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h2 className="text-xl font-semibold text-gray-400 mb-4">
                Variants
              </h2>
              {stockData.variants.map((variant, variantIndex) => (
                <div
                  key={variantIndex}
                  className="mb-6 p-4 border border-gray-200 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-400 mb-2">
                    Variant {variantIndex + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor={`storage-size-${variantIndex}`}
                        className="block text-sm font-medium text-gray-500 mb-1"
                      >
                        Storage Size
                      </label>
                      <select
                        id={`storage-size-${variantIndex}`}
                        value={variant.storage.size}
                        onChange={(e) =>
                          handleVariantChange(
                            variantIndex,
                            "size",
                            e.target.value
                          )
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Size</option>
                        <option value="64">64</option>
                        <option value="128">128</option>
                        <option value="256">256</option>
                        <option value="512">512</option>
                        <option value="1024">1024</option>
                      </select>
                      {/* 
                      <input
                        type="number"
                        id={`storage-size-${variantIndex}`}
                        value={variant.storage.size}
                        onChange={(e) =>
                          handleVariantChange(
                            variantIndex,
                            "size",
                            Number(e.target.value)
                          )
                        }
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      /> */}
                    </div>
                    <div>
                      <label
                        htmlFor={`storage-unit-${variantIndex}`}
                        className="block text-sm font-medium text-gray-500 mb-1"
                      >
                        Storage Unit
                      </label>
                      <select
                        id={`storage-unit-${variantIndex}`}
                        value={variant.storage.unit}
                        onChange={(e) =>
                          handleVariantChange(
                            variantIndex,
                            "unit",
                            e.target.value
                          )
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                      </select>
                    </div>
                  </div>

                  {/* Regional Pricing */}
                  <h4 className="text-md font-medium text-gray-500 mb-2">
                    Regional Pricing
                  </h4>
                  {variant.regional_pricing.map((pricing, priceIndex) => (
                    <div
                      key={priceIndex}
                      className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-500"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                          <label
                            htmlFor={`region-name-${variantIndex}-${priceIndex}`}
                          >
                            Region Name
                          </label>
                          <select
                            id={`region-name-${variantIndex}-${priceIndex}`}
                            value={pricing.region.name}
                            defaultValue={"bangladesh"}
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "region.name",
                                e.target.value
                              )
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select Region</option>
                            <option value={"global"}>Global</option>

                            {regions
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((region) => (
                                <option key={region.id} value={region.name}>
                                  {region.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor={`currency-code-${variantIndex}-${priceIndex}`}
                          >
                            Currency Code
                          </label>
                          <select
                            id={`currency-code-${variantIndex}-${priceIndex}`}
                            value={pricing.region.currency_code}
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "region.currency_code",
                                e.target.value
                              )
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="USD">USD</option>
                            <option value="TK">TK</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor={`currency-symbol-${variantIndex}-${priceIndex}`}
                          >
                            Currency Symbol
                          </label>
                          <select
                            id={`currency-symbol-${variantIndex}-${priceIndex}`}
                            value={pricing.region.currency_symbol}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "region.currency_symbol",
                                e.target.value
                              )
                            }
                            required
                          >
                            <option value="$">$</option>
                            <option value="৳">৳</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor={`price-${variantIndex}-${priceIndex}`}
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            id={`price-${variantIndex}-${priceIndex}`}
                            value={pricing.price}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "price",
                                Number(e.target.value)
                              )
                            }
                            required
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor={`discount_price-${variantIndex}-${priceIndex}`}
                          >
                            Discount Price
                          </label>
                          <input
                            type="number"
                            id={`discount_price-${variantIndex}-${priceIndex}`}
                            value={pricing.discount_price}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "discount_price",
                                Number(e.target.value)
                              )
                            }
                            required
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor={`purchase-price-${variantIndex}-${priceIndex}`}
                          >
                            Purchase Price
                          </label>
                          <input
                            type="number"
                            id={`purchase-price-${variantIndex}-${priceIndex}`}
                            value={pricing.purchase_price}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "purchase_price",
                                Number(e.target.value)
                              )
                            }
                            required
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor={`stock-quantity-${variantIndex}-${priceIndex}`}
                          >
                            Stock Quantity
                          </label>
                          <input
                            type="number"
                            id={`stock-quantity-${variantIndex}-${priceIndex}`}
                            value={pricing.stock_quantity}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "stock_quantity",
                                Number(e.target.value)
                              )
                            }
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      {variant.regional_pricing.length > 1 && (
                        <button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="mt-4 flex items-center border px-2 rounded-full bg-red-50 text-red-600 hover:text-red-800"
                          onClick={() =>
                            removeRegionalPricing(variantIndex, priceIndex)
                          }
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Regional Pricing
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addRegionalPricing(variantIndex)}
                    className="mt-2 text-indigo-600 hover:text-indigo-800"
                  >
                    Add Regional Pricing
                  </button>
                  {stockData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(variantIndex)}
                      className="mt-4 text-red-600 hover:text-red-800"
                    >
                      Remove Variant
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addVariant}
                className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Variant
              </button>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 text-right flex justify-end gap-5">
            <button
              className="px-4 py-2 flex items-center border rounded-md  bg-red-50 text-red-600 hover:text-red-800  shadow-sm  disabled:cursor-not-allowed"
              onClick={() => router.back()}
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2 inline-block" />
                  Processing...
                </>
              ) : (
                "Submit Stock Data"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
