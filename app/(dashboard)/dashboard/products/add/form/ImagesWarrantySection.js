import React from "react";
import { Upload } from "lucide-react";
import { X } from "lucide-react";
import UploadImage from "./UploadImage";

export default function ImagesWarrantySection({
  register,
  errors,
  imageFields,
  appendImage,
  removeImage,
  setValue,
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-400 mt-8">
        Warranty Information
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Warranty</label>
          <input
            {...register("warranty_information", {
              required: "Warranty information is required",
            })}
            placeholder="1 Year warranty (To claim please visit the nearest TCL service center)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.warranty_information && (
            <p className="text-red-500 text-sm">
              {errors.warranty_information.message}
            </p>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-400 mt-8">Images</h3>
      <div className="  gap-4 text-gray-500">
        <div className="space-y-4 w-full">
          <label className="block text-sm font-medium text-gray-500">
            Images *
          </label>
          <div className="grid grid-cols-4  gap-4 text-gray-500">
            {imageFields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col items-center gap-2 p-4 border rounded-md"
              >
                <label className="text-sm font-medium text-gray-500">
                  Image
                </label>
                <UploadImage setValue={setValue} index={index} />
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
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-olive-500 rounded-lg"
            >
              <Upload className="w-4 h-4" />
              Add Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
