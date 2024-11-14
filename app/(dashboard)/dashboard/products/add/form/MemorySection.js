import React from "react";

export default function MemorySection({ register, errors }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4">Memory</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">RAM</label>
          <input
            {...register("memory.ram", { required: "RAM is required" })}
            placeholder="6GB"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.memory?.ram && (
            <p className="text-red-500 text-sm">{errors.memory.ram.message}</p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
            Internal Storage
          </label>
          <input
            {...register("memory.internalStorage", {
              required: "Internal storage is required",
            })}
            placeholder="256GB eMMC 5.1"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.memory?.internalStorage && (
            <p className="text-red-500 text-sm">
              {errors.memory.internalStorage.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
            External Storage
          </label>
          <input
            {...register("memory.externalStorage", {
              required: "External storage is required",
            })}
            placeholder="128GB eMMC 5.1"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.memory?.externalStorage && (
            <p className="text-red-500 text-sm">
              {errors.memory.externalStorage.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
