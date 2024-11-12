"use client";

import { addColor } from "@/store/slices/colorSlice";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBagIcon,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ProductInfo = ({ product }) => {
  const [selectedStorage, setSelectedStorage] = useState(
    `${product?.variants[0]?.storage.size}${product?.variants[0]?.storage.unit}`
  );

  const [selectedPrice, setSelectedPrice] = useState({
    discount_price: product?.variants[0]?.regional_pricing[0]?.discount_price,
    price: product?.variants[0]?.regional_pricing[0]?.price,
  });

  const [selectedRegion, setSelectedRegion] = useState(
    product?.variants[0]?.regional_pricing[0]?.region?.name
  );

  const [quantity, setQuantity] = useState(1);
  const color = useSelector((state) => state.color);
  const dispatch = useDispatch();

  // Extract unique regions
  const uniqueRegions = [
    ...new Set(
      product.variants.flatMap((variant) =>
        variant.regional_pricing
          .filter((pricing) => pricing.region?.name)
          .map((pricing) => pricing.region.name)
      )
    ),
  ];

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleColorSelect = (formattedColor, imageUrl) => {
    dispatch(addColor({ color: formattedColor, image: imageUrl }));
  };

  const handleStorageSelect = (variant, storageOption) => {
    const selectedPricing = variant.regional_pricing.find(
      (pricing) => pricing.region.name == selectedRegion
    );
    console.log("selectedPricing", selectedPricing.discount_price);
    setSelectedStorage(storageOption);
    setSelectedPrice({
      discount_price: selectedPricing.discount_price,
      price: selectedPricing.price,
    });
  };
  const formatColor = (colorVariant) => {
    return colorVariant
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="col-span-8">
      <div className="product__widget p-10 rounded-2xl space-y-5">
        {/* Product Header Section */}
        <div className="dark:bg-gray-900 p-5 rounded-xl">
          <div className="absolute right-36">
            <span className="text-lg">Discount Price:</span>
            <div className="text-3xl font-bold text-yellow-600">
              ৳{selectedPrice.discount_price?.toLocaleString("en-BD")}
            </div>
            <del className="text-gray-500">
              ৳{selectedPrice.price?.toLocaleString()}
            </del>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {product?.product?.product_name}
            </h1>
            <div className="flex gap-2">
              <div className="text-xl mb-4">{selectedRegion}</div>
              {" | "}
              <div className="text-xl mb-4">{selectedStorage}</div>
              {" | "}
              <div className="text-xl mb-4">
                {color.color || product?.product?.image[0]?.color_variant}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <p className="mb-4">{product?.product?.description}</p>
          <div className="flex space-x-2 mb-4">
            <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded">
              {product?.product?.brand_name}
            </a>
            <button className="p-2 bg-gray-200 rounded">
              <Heart />
            </button>
          </div>

          {/* Product Specifications */}
          <div className="grid grid-cols-3 text-sm gap-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Status:</div>
              <div className="text-green-600">
                {product.status.toUpperCase()}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Warranty:</div>
              <div className="text-green-600">
                {product?.product?.warranty_information?.period}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Regular Price:</div>
              <div>৳{selectedPrice.price}</div>
            </div>
          </div>
        </div>

        {/* Storage and Region Selection */}
        <div className="dark:bg-gray-900 p-5 rounded-xl">
          <div className="mb-4">
            <h5 className="font-bold mb-2">Storage:</h5>
            <div className="flex space-x-2">
              {product?.variants?.map((variant) => {
                const storageOption = `${variant.storage.size}${variant.storage.unit}`;
                return (
                  <button
                    key={storageOption}
                    className={`px-4 py-2 border rounded ${
                      selectedStorage === storageOption
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    onClick={() => handleStorageSelect(variant, storageOption)}
                  >
                    {storageOption}
                  </button>
                );
              })}
            </div>

            <h5 className="font-bold mt-4 mb-2">Region:</h5>
            <div className="flex space-x-2">
              {uniqueRegions.map((regionOption, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded ${
                    selectedRegion === regionOption
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                  onClick={() => setSelectedRegion(regionOption)}
                >
                  {regionOption}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <h5 className="font-bold mb-2">Color:</h5>
            <div className="flex space-x-2">
              {product?.product?.image?.map((img) => {
                const formattedColor = formatColor(img.color_variant);
                return (
                  <button
                    key={img.color_variant}
                    className={`px-4 py-2 border rounded ${
                      color.color === formattedColor
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    onClick={() => handleColorSelect(formattedColor, img.url)}
                  >
                    {formattedColor}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Purchase Actions */}
        <div className="grid grid-cols-3 gap-8 mb-4 dark:bg-gray-900 p-5 rounded-xl">
          <div className="border rounded p-2 w-full flex items-center justify-between">
            <button
              className="p-2 bg-emerald-600 text-black rounded"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              className="w-20 text-center bg-inherit"
              value={quantity}
              readOnly
            />
            <button
              className="p-2 bg-emerald-600 text-black rounded"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus size={20} />
            </button>
          </div>
          <button className="px-8 py-4 bg-blue-600 text-white rounded flex items-center justify-center">
            <ShoppingCart className="mr-2" /> Add to cart
          </button>
          <button className="px-8 py-4 bg-green-600 text-white rounded flex items-center justify-center">
            <ShoppingBagIcon className="mr-2" /> Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
