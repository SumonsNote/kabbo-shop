"use client";

import React, { useState } from "react";
import { PlusCircle, MinusCircle, Loader2 } from "lucide-react";

export default function AddStockForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [stockData, setStockData] = useState({
    product: "",
    sku: "",
    stock: 0,
    sell_price: 0,
    purchase_price: 0,
    dealer: "",
    sold_out: 0,
    variants: [
      {
        storage: { size: 0, unit: "GB" },
        regional_pricing: [
          {
            region: { name: "", currency_code: "", currency_symbol: "" },
            price: 0,
            stock_quantity: 0,
          },
        ],
      },
    ],
    status: "active",
  });

  const handleInputChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would typically send the stockData to your API
    console.log(stockData);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsLoading(false);
    alert("Stock data submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-500 mb-8">
          Add New Stock Item
        </h1>
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
                  Product ID
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={stockData.product}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="sell_price"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Sell Price
                </label>
                <input
                  type="number"
                  id="sell_price"
                  name="sell_price"
                  value={stockData.sell_price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="purchase_price"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Purchase Price
                </label>
                <input
                  type="number"
                  id="purchase_price"
                  name="purchase_price"
                  value={stockData.purchase_price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
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
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="sold_out"
                  className="block text-sm font-medium text-gray-500 mb-1"
                >
                  Sold Out
                </label>
                <input
                  type="number"
                  id="sold_out"
                  name="sold_out"
                  value={stockData.sold_out}
                  onChange={handleInputChange}
                  min="0"
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
                  value={stockData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
                      />
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
                      className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-md"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                        <div>
                          <label
                            htmlFor={`region-name-${variantIndex}-${priceIndex}`}
                            className="block text-sm font-medium text-gray-500 mb-1"
                          >
                            Region Name
                          </label>
                          <input
                            type="text"
                            id={`region-name-${variantIndex}-${priceIndex}`}
                            value={pricing.region.name}
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
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`currency-code-${variantIndex}-${priceIndex}`}
                            className="block text-sm font-medium text-gray-500 mb-1"
                          >
                            Currency Code
                          </label>
                          <input
                            type="text"
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
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`currency-symbol-${variantIndex}-${priceIndex}`}
                            className="block text-sm font-medium text-gray-500 mb-1"
                          >
                            Currency Symbol
                          </label>
                          <input
                            type="text"
                            id={`currency-symbol-${variantIndex}-${priceIndex}`}
                            value={pricing.region.currency_symbol}
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "region.currency_symbol",
                                e.target.value
                              )
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor={`price-${variantIndex}-${priceIndex}`}
                            className="block text-sm font-medium text-gray-500 mb-1"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            id={`price-${variantIndex}-${priceIndex}`}
                            value={pricing.price}
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "price",
                                Number(e.target.value)
                              )
                            }
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`stock-quantity-${variantIndex}-${priceIndex}`}
                            className="block text-sm font-medium text-gray-500 mb-1"
                          >
                            Stock Quantity
                          </label>
                          <input
                            type="number"
                            id={`stock-quantity-${variantIndex}-${priceIndex}`}
                            value={pricing.stock_quantity}
                            onChange={(e) =>
                              handleRegionalPricingChange(
                                variantIndex,
                                priceIndex,
                                "stock_quantity",
                                Number(e.target.value)
                              )
                            }
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      {variant.regional_pricing.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeRegionalPricing(variantIndex, priceIndex)
                          }
                          className="mt-2 text-red-600 hover:text-red-800"
                        >
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

          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 text-right">
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
