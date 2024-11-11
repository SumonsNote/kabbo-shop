"use client";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBagIcon,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

const p = {
  name: "Iphone",
  discountPrice: 129999,
  regularPrice: 149999,
  subtitle: "Latest Flagship Smartphone",
  description:
    "Experience the next generation of mobile technology with our flagship device featuring cutting-edge camera system, powerful performance, and stunning display.",
  brand: "Samsung",
  status: "In Stock",
  warranty: "1 Year Official Warranty",
  variants: {
    storage: ["128GB", "256GB", "512GB"],
    color: ["Phantom Black", "Phantom Silver", "Phantom Green"],
  },
  features: [
    "5G Connectivity",
    "IP68 Water Resistance",
    "120Hz Dynamic AMOLED Display",
    "8K Video Recording",
  ],
  specifications: {
    screen: "6.8-inch Dynamic AMOLED 2X",
    processor: "Snapdragon 8 Gen 2",
    battery: "5000mAh",
    charging: "45W Fast Charging",
  },
  shipping: {
    delivery: "Free Delivery",
    estimatedTime: "2-3 Business Days",
    returnPolicy: "7 Days Easy Return",
  },
};

export const ProductInfo = ({ product }) => {
  const [selectedStorage, setSelectedStorage] = useState(
    `${product?.variants[0]?.storage.size}${product?.variants[0]?.storage.unit}`
  );
  const [selectedRegion, setSelectedRegion] = useState(
    `${product?.variants[0]?.regional_pricing[0]?.region?.name}`
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(p?.variants?.color[0]);
  const [selectedImage, setSelectedImage] = useState(
    product?.product?.image[0]?.url
  );

  const uniqueRegions = new Set();
  product.variants.forEach((variant) => {
    variant.regional_pricing.forEach((pricing) => {
      if (pricing.region?.name) uniqueRegions.add(pricing.region.name);
    });
  });

  return (
    <div className="col-span-8">
      <div className="product__widget p-10 rounded-2xl space-y-5">
        <div className="dark:bg-gray-900 p-5 rounded-xl">
          <div className="absolute right-36">
            <span className="text-lg">Discount Price:</span>
            <div className="text-3xl font-bold text-yellow-600">
              ৳{product?.sell_price?.toLocaleString("en-BD")}
            </div>
            <del className="text-gray-500">
              ৳{p?.regularPrice.toLocaleString()}
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
              <div className="text-xl mb-4">{selectedColor}</div>
            </div>
          </div>
          <p className="mb-4">{product?.product?.description}</p>
          <div className="flex space-x-2 mb-4">
            <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded">
              {product?.product?.brand_name}
            </a>
            <button className="p-2 bg-gray-200 rounded">
              <Heart />
            </button>
          </div>
          <div className="grid grid-cols-3 text-sm gap-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Status:</div>

              <div className="text-green-600">
                {product?.status.toUpperCase()}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Warranty:</div>
              <div>{product?.product?.warranty_information?.period}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Regular Price:</div>
              <div>৳{p?.regularPrice}</div>
            </div>
          </div>
        </div>

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
                    onClick={() => setSelectedStorage(storageOption)}
                  >
                    {storageOption}
                  </button>
                );
              })}
            </div>
            <h5 className="font-bold mt-4 mb-2">Region:</h5>
            <div className="flex space-x-2">
              {Array.from(uniqueRegions).map((regionOption, index) => (
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
          <div className="mb-4">
            <h5 className="font-bold mb-2">Color:</h5>
            <div className="flex space-x-2">
              {product?.product?.colors?.map((color) => {
                const formattedColor = color
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                return (
                  <button
                    key={color}
                    className={`px-4 py-2 border rounded ${
                      selectedColor === formattedColor
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedColor(formattedColor);

                      const matchingImage = product?.product?.image?.find(
                        (img) => img.color_variant === color
                      );
                      if (matchingImage) {
                        setSelectedImage(matchingImage.url);
                      }
                    }}
                  >
                    {formattedColor}
                  </button>
                );
              })}
              {product?.product?.image?.map((img) => {
                const formattedColor = img.color_variant
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                return (
                  <button
                    key={img.color_variant}
                    className={`px-4 py-2 border rounded ${
                      selectedColor === formattedColor
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedColor(formattedColor)}
                  >
                    {formattedColor}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mb-4 dark:bg-gray-900 p-5 rounded-xl">
          <div className="border rounded p-2 w-full flex items-center justify-between">
            <button
              className="p-2 bg-emerald-600 text-black rounded"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
              onClick={() => setQuantity(quantity + 1)}
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
