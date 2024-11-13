import React from "react";
import CloudinaryUploader from "../ImageUpload";

export default function ImagesWarrantySection({ register, errors }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mt-8">
        Warranty Information
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Warranty</label>
          <input
            {...register("warranty", {
              required: "Warranty information is required",
            })}
            placeholder="1 Year warranty (To claim please visit the nearest TCL service center)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.warranty && (
            <p className="text-red-500 text-sm">{errors.warranty.message}</p>
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mt-8">Images</h3>
      <div className="grid-cols-2  gap-4">
        <CloudinaryUploader />
      </div>
    </div>
  );
}
