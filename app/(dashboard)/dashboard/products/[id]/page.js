"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

import { useRef } from "react";
import { toast } from "react-toastify";

import {
  useFetchSingleProductsQuery,
  useUpdateProductMutation,
} from "@/store/slices/productApi";
import CodeEditor from "../new/components/RichTextEditor";
import Loading from "../../loadding";
import { useEffect } from "react";
import BackButton from "../../components/ui/BackButton";
import { extractTableData } from "../new/components/extracTableData";
import ProductDetailsSkeleton from "../new/components/SingleProductLoader";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isSuccess, refetch } =
    useFetchSingleProductsQuery(id);
  const [
    updateProduct,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateProductMutation();
  const codeRef = useRef();

  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    isSuccess && setEditedProduct(data?.product);
  }, [isSuccess, data]);
  const handleInputChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    updateProduct({
      ...editedProduct,
      specificationsHtml: codeRef?.current?.getContent(),
      specifications: extractTableData(codeRef.current.getContent()),
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Product updated successfully");
      setIsEditMode(false);
      refetch();
    }
    if (updateError) {
      toast.error("Error updating product");
    }
    if (updateLoading) {
      toast.info("Updating product...");
    }
  }, [updateError, updateSuccess, updateLoading]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  const renderField = (label, field, type = "text") => {
    return (
      <div>
        <p className="text-gray-600">{label}</p>
        {isEditMode ? (
          <input
            type={type}
            value={editedProduct[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="font-medium">{editedProduct[field]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="flex justify-between items-center mb-6 sticky top-0 py-10 bg-white z-10">
        {isEditMode ? (
          <input
            type="text"
            value={editedProduct.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="text-3xl font-bold text-gray-900 border rounded p-1"
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-900">
            {editedProduct.name}
          </h1>
        )}

        <div className="flex gap-2">
          {isEditMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setEditedProduct(data?.product);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="border rounded-lg overflow-hidden mb-4 p-2">
            {editedProduct.images && editedProduct.images.length > 0 ? (
              <Image
                src={editedProduct.images[activeImageIndex]}
                alt={editedProduct.name}
                width={600}
                height={600}
                className="w-full h-96 object-contain"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                No Image Available
              </div>
            )}
          </div>

          {editedProduct.images && editedProduct.images.length > 1 && (
            <div className="flex space-x-2">
              {editedProduct.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-16 h-16 border rounded-lg overflow-hidden ${
                    index === activeImageIndex ? "border-blue-500" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Product Status
            </h3>
            {[
              "is_new",
              "is_trending",
              "is_offer",
              "top_seller",
              "best_seller",
            ].map((status) => (
              <label key={status} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={editedProduct[status]}
                  onChange={(e) => handleInputChange(status, e.target.checked)}
                  disabled={!isEditMode}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  {status
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              {renderField("Purchase Price", "purchase_price", "number")}
              {renderField("Original Price", "original_price", "number")}
              {renderField("Discount Price", "discount_price", "number")}

              <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-md font-medium">
                {editedProduct.isUsed ? "Used" : "New"}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {renderField("Model", "model")}
                {renderField("Brand", "brand")}
                {renderField("Storage", "storage")}
                {renderField("RAM", "ram")}
              </div>

              {/* Colors */}
              <div>
                <p className="text-gray-600">Colors</p>
                {isEditMode ? (
                  <input
                    type="text"
                    value={editedProduct?.color?.join(", ")}
                    onChange={(e) =>
                      handleInputChange("color", e.target.value.split(", "))
                    }
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  <p className="font-medium">
                    {editedProduct?.color?.join(", ")}
                  </p>
                )}
              </div>

              {/* Continue with other fields similarly */}
              {renderField("Short Description", "short_description")}

              <div className="grid grid-cols-2 gap-4">
                {renderField("Region", "region")}
                {renderField("Stock", "stock", "number")}
                {renderField("SIM Variant", "simVariant")}
                {renderField("Warranty", "warrantyStatus")}
              </div>
            </div>
          </div>

          {/* Used Product Details Section */}
          {editedProduct.isUsed === "true" && (
            <div className="bg-gray-50 shadow rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Used Product Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {renderField("Used Duration", "usedDuration")}
                {renderField("Battery Health", "batteryHealth")}
                {renderField("Scratches", "scratches")}
                {renderField("Dents", "dents")}
                {renderField("Accessories", "accessoriesWithDevice")}
                {renderField("Box", "box")}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Detailed Specifications
        </h3>
        {isEditMode ? (
          <CodeEditor
            ref={codeRef}
            content={editedProduct.specificationsHtml}
          />
        ) : (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: editedProduct.specificationsHtml,
            }}
          />
        )}
      </div>
    </div>
  );
}
