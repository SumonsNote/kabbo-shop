"use client";

import React, { useState } from "react";
import { PlusCircle, MinusCircle, Loader2 } from "lucide-react";

export default function AddOrderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([{ product: "", quantity: 1, price: "" }]);

  const addItem = () => {
    setItems([...items, { product: "", quantity: 1, price: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would typically send the form data to your API
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsLoading(false);
    alert("Order submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Order</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="p-6 space-y-6">
            {/* Customer Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="customer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Customer ID
                  </label>
                  <input
                    type="text"
                    id="customer"
                    name="customer"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Items
              </h2>
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Product ID"
                      value={item.product}
                      onChange={(e) =>
                        handleItemChange(index, "product", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="text"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <MinusCircle className="h-6 w-6" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Item
              </button>
            </div>

            {/* Shipping Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postal_code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="payment_method"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Payment Method
                  </label>
                  <select
                    id="payment_method"
                    name="payment_method"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="transaction_id"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    id="transaction_id"
                    name="transaction_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Options
              </h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="requires_tracking"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Requires Tracking
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="requires_payment_receipt"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Requires Payment Receipt
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="requiresAttention"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Requires Attention
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 text-right">
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
                "Submit Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
