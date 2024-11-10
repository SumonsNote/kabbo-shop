"use client";
import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  ChevronDown,
  Check,
} from "lucide-react";
import { ShoppingBagIcon } from "lucide-react";

// Mock data (in a real app, this would come from an API)
const productData = {
  name: "iPhone 14 - Official",
  subtitle: "128GB | Midnight",
  regularPrice: 146999,
  discountPrice: 117999,
  description:
    "The iPhone 14 is a sleek and powerful smartphone that offers a great user experience. It features a 6.1-inch Super Retina XDR display, a powerful A16 Bionic chip, and a new dual-camera system with improved image quality.",
  brand: "Apple",
  sku: "iPhone14official",
  warranty: "1 Year Official Warranty",
  status: "Stock Available",
  images: [
    "https://d61s2hjse0ytn.cloudfront.net/color/1372/iPhone_14_Midnight.webp",
  ],
  variants: {
    storage: ["128GB", "256GB", "512GB"],
    color: ["Midnight", "Stormlight", "Space Grey"],
  },
  points: 200,
  bookingMoney: 1000,
  purchasePoints: 200,
  emiAvailable: true,
};

const relatedProducts = [
  {
    id: 1,
    name: "iPhone 16 Pro - USA",
    price: 136999,
    image:
      "https://d61s2hjse0ytn.cloudfront.net/color/1374/iphone_15_pro__Natural_Titanium_3_.webp",
  },
  {
    id: 2,
    name: "Apple Magic Keyboard for iPad Pro M4 (2024)",
    price: 49999,
    image:
      "https://d61s2hjse0ytn.cloudfront.net/card_image/None/magic_keyboard_ipad_pro_2024.webp",
  },
  {
    id: 3,
    name: 'iMac 24" M4 (2024)',
    price: 10000,
    image: "https://d61s2hjse0ytn.cloudfront.net/card_image/None/imac_m4.webp",
  },
  {
    id: 4,
    name: "Mac Mini M4 Pro (2024)",
    price: 10000,
    image:
      "https://d61s2hjse0ytn.cloudfront.net/card_image/None/Mac_Mini_M4_d7cH5qD.webp",
  },
];

const ProductGallery = ({ images }) => (
  <div className="col-span-4 mb-4   ">
    <div className="product__gallery">
      <figure className="gallery__image ring-1 ring-gray-300 dark:ring-gray-500 overflow-hidden relative rounded-lg">
        <img src={images[0]} alt="Product" className="w-full rounded-lg" />
        <div className="absolute top-10 -left-10 px-10 bg-gray-300 text-emerald-700 dark:bg-blue-800 text-sm font-bold py-1 rounded -rotate-45">
          Earn {productData.points} Points
        </div>
        <div className="absolute top-2 right-2 bg-white rounded px-1">
          <img
            src="https://www.sumashtech.com/_ipx/q_100/images/official_badge.webp"
            alt="Official Product"
            className="w-20"
          />
        </div>
      </figure>
    </div>
  </div>
);

const ProductInfo = ({ product, quantity, setQuantity }) => {
  const [selectedStorage, setSelectedStorage] = useState(
    product.variants.storage[0]
  );
  const [selectedColor, setSelectedColor] = useState(product.variants.color[0]);

  return (
    <div className="col-span-8">
      <div className="product__widget  p-10 rounded-2xl space-y-5">
        <div className="dark:bg-gray-900 p-5 rounded-xl">
          <div className="">
            <div className="absolute right-36">
              <span className="text-lg">Discount Price:</span>
              <div className="text-3xl font-bold text-yellow-600">
                ৳{product.discountPrice.toLocaleString()}
              </div>
              <del className="text-gray-500">
                ৳{product.regularPrice.toLocaleString()}
              </del>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="text-xl mb-4">{product.subtitle}</div>
            </div>
          </div>

          <p className="mb-4">{product.description}</p>
          <div className="flex space-x-2 mb-4">
            <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded">
              {product.brand}
            </a>
            <button className="p-2 bg-gray-200 rounded">
              <Heart />
            </button>
          </div>
          <div className="grid grid-cols-3 text-sm gap-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Status:</div>
              <div className="text-green-600">{product.status}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Warranty:</div>
              <div>{product.warranty}</div>
            </div>{" "}
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded inline-flex gap-2">
              <div className="font-bold">Regular Price:</div>
              <div>৳{product.regularPrice}</div>
            </div>
          </div>
        </div>

        <div className="dark:bg-gray-900 p-5 rounded-xl">
          <div className="mb-4">
            <h5 className="font-bold mb-2">Storage:</h5>
            <div className="flex space-x-2">
              {product.variants.storage.map((storage) => (
                <button
                  key={storage}
                  className={`px-4 py-2 border rounded ${
                    selectedStorage === storage ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h5 className="font-bold mb-2">Color:</h5>
            <div className="flex space-x-2">
              {product.variants.color.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3  gap-8 mb-4 dark:bg-gray-900 p-5 rounded-xl">
          <div className=" border rounded p-2 w-full flex items-center justify-between">
            <button
              className="p-2 bg-emerald-600 text-black rounded"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              className="w-20 text-center bg-inherit "
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

const RelatedProducts = ({ products }) => (
  <div className="my-8 dark:bg-gray-900 p-5 rounded-xl">
    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
    <div className="grid grid-cols-4 gap-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-black-100/20 dark:border-gray-100/20 bg rounded-lg overflow-hidden p-1 flex items-center justify-start text-md"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover"
          />
          <div className="p-1">
            <h3 className="font-bold">{product.name}</h3>
            <div className="mt-2">৳{product.price.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Specifications = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    "Physical Specification",
    "Network",
    "Display",
    "Processor",
    "Memory",
    "Main Camera",
    "Selfie Camera",
    "OS",
    "Connectivity",
    "Features",
    "Battery",
    "Test",
  ];

  return (
    <div className="my-8 dark:bg-gray-900 p-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Specification</h2>
      {sections.map((section, index) => (
        <div key={index} className="border-b">
          <button
            className="flex justify-between items-center w-full py-3 text-left"
            onClick={() => setOpenSection(openSection === index ? null : index)}
          >
            <span>{section}</span>
            <ChevronDown
              className={`transform transition-transform ${
                openSection === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === index && (
            <div className="py-2">
              {/* Placeholder content */}
              <p>Specification details for {section}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 text-gray-500 ">
      <nav className="text-sm my-4">
        <ul className="flex">
          <li>
            <a href="/">Home</a>/
          </li>
          <li>
            <a href="/category/phone">Phone</a>/
          </li>
          <li>
            <a href="/category/phone-iphone">iPhone</a>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-12  gap-16 w-full">
        <ProductGallery images={productData.images} />
        <ProductInfo
          product={productData}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <RelatedProducts products={relatedProducts} />
      <Specifications />

      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4 rounded-lg"
        role="alert"
      >
        <p className="font-bold">Note</p>
        <p>
          We aim to provide accurate info from trusted sources like the
          manufacturer&apos;s website. If you find any mistakes, please let us
          know.
        </p>
      </div>
    </div>
  );
}
