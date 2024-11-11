"use client";

import { addColor } from "@/store/slices/colorSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
export const ProductGallery = ({ product }) => {
  const color = useSelector((state) => state.color);
  const dispatch = useDispatch();

  const selectedImage = color.image || product?.product?.image[0]?.url;

  return (
    <div className="col-span-4 mb-4">
      <div className="product__gallery">
        <figure className="gallery__image ring-1 ring-gray-300 dark:ring-gray-500 overflow-hidden relative rounded-lg">
          <Image
            src={selectedImage}
            width={400}
            height={400}
            alt="Product"
            className="w-full rounded-lg"
          />
          <div className="absolute top-10 -left-10 px-10 bg-gray-300 text-emerald-700 dark:bg-blue-800 text-sm font-bold py-1 rounded -rotate-45">
            Earn Points
          </div>
        </figure>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {product?.product?.image.map((img, index) => (
            <figure
              key={index}
              onClick={() =>
                dispatch(addColor({ color: img.color_variant, image: img.url }))
              }
              className={`cursor-pointer ring-1 ${
                selectedImage === img.url
                  ? "ring-blue-500 ring-2"
                  : "ring-gray-300 dark:ring-gray-500"
              } overflow-hidden rounded-lg`}
            >
              <Image
                src={img.url}
                width={100}
                height={100}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};
