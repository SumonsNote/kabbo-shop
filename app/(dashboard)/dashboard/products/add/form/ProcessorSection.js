import React from "react";

export default function ProcessorSection({ register, errors }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Processor</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Chipset</label>
          <input
            {...register("processor.chipset", {
              required: "Chipset is required",
            })}
            placeholder="MediaTek Helio G37"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.processor?.chipset && (
            <p className="text-red-500 text-sm">
              {errors.processor.chipset.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium">CPU Type</label>
          <input
            {...register("processor.cpuType", {
              required: "CPU type is required",
            })}
            placeholder="Octa-core"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.processor?.cpuType && (
            <p className="text-red-500 text-sm">
              {errors.processor.cpuType.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium">CPU Speed</label>
          <input
            {...register("processor.cpuSpeed", {
              required: "CPU speed is required",
            })}
            placeholder="2.0 GHz"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.processor?.cpuSpeed && (
            <p className="text-red-500 text-sm">
              {errors.processor.cpuSpeed.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium">GPU</label>
          <input
            {...register("processor.gpu", { required: "GPU is required" })}
            placeholder="PowerVR GE8320"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.processor?.gpu && (
            <p className="text-red-500 text-sm">
              {errors.processor.gpu.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
