"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, X, Upload, Save } from "lucide-react";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      colors: [""],
      image: [{ url: "", colors: "" }],
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "image",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  const SpecificationSection = ({ title, registerName }) => (
    <div className="space-y-4 ">
      <h3 className="font-medium text-gray-500">{title}</h3>
      <textarea
        {...register(`${registerName}`)}
        className="w-full px-3 py-2 border dark:bg-gray-900 dark:text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto p-6 space-y-8 product-form "
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-500">Add New Product</h2>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Product Name *
            </label>
            <input
              {...register("product_name", {
                required: "Product name is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.product_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.product_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Product Model (Unique) *
            </label>
            <input
              {...register("product_model", {
                required: "Product model is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.product_model && (
              <p className="mt-1 text-sm text-red-600">
                {errors.product_model.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Brand Name *
            </label>
            <input
              {...register("brand_name", {
                required: "Brand name is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.brand_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.brand_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Category Name *
            </label>
            <input
              {...register("category_name", {
                required: "Category name is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.category_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-500">
            Colors *
          </label>
          <div className="space-y-2">
            {colorFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`colors.${index}`)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter color"
                />
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendColor("")}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add Color
          </button>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-500">
            Images *
          </label>
          <div>
            {imageFields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col gap-2 p-4 border rounded-md"
              >
                <label className="text-sm font-medium text-gray-500">
                  Image URL
                </label>
                <input
                  {...register(`image.${index}.url`, {
                    required: "Image URL is required",
                  })}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter image URL"
                />
                <label className="text-sm font-medium text-gray-500">
                  Image Colors
                </label>
                <input
                  {...register(`image.${index}.colors`, {
                    required: "Image colors are required",
                  })}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter image colors (e.g., red, blue)"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendImage({ url: "", colors: "" })}
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Upload className="w-4 h-4" />
              Add Image URL
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Description *
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Specifications */}
        <div className="space-y-6 product-form">
          <h3 className="text-lg font-semibold text-gray-500">
            Specifications
          </h3>

          <SpecificationSection title="Display" registerName="display" />
          <SpecificationSection title="Processor" registerName="processor" />
          <SpecificationSection title="Memory" registerName="memory" />
          <SpecificationSection
            title="Rear Camera"
            registerName="rear_camera"
          />
          <SpecificationSection
            title="Front Camera"
            registerName="front_camera"
          />
          <SpecificationSection title="Audio" registerName="audio" />
          <SpecificationSection
            title="Network Connectivity"
            registerName="network_connectivity"
          />
          <SpecificationSection
            title="Operating System"
            registerName="operating_system"
          />
          <SpecificationSection title="Features" registerName="features" />
          <SpecificationSection title="Battery" registerName="battery" />
          <SpecificationSection
            title="Physical Specification"
            registerName="physical_specification"
          />
          <SpecificationSection
            title="Warranty Information"
            registerName="warranty_information"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="w-5 h-5" />
            Save Product
          </button>
        </div>
      </div>
      <style jsx>{`
        .product-form input,
        .product-form textarea,
        .product-form select {
          background-color: inherit;
          color: #6b7280;
        }
      `}</style>
    </form>
  );
};

export default ProductForm;
