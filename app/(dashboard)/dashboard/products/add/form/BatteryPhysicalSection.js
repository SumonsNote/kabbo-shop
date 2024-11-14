import React from "react";

export default function BatteryPhysicalSection({ register, errors }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">
        Battery
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Type</label>
          <input
            {...register("battery.type", {
              required: "Battery type is required",
            })}
            placeholder="Lithium-polymer 5010 mAh (non-removable)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.battery?.type && (
            <p className="text-red-500 text-sm">
              {errors.battery.type.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
            Fast Charging
          </label>
          <input
            {...register("battery.fastCharging", {
              required: "Fast charging details are required",
            })}
            placeholder="18W Wired"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.battery?.fastCharging && (
            <p className="text-red-500 text-sm">
              {errors.battery.fastCharging.message}
            </p>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">
        Physical Specifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Dimension</label>
          <input
            {...register("physicalSpecifications.dimension", {
              required: "Dimension details are required",
            })}
            placeholder="167.9 x 76.5 x 8.5 mm (6.61 x 3.01 x 0.33 in)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.physicalSpecifications?.dimension && (
            <p className="text-red-500 text-sm">
              {errors.physicalSpecifications.dimension.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Weight</label>
          <input
            {...register("physicalSpecifications.weight", {
              required: "Weight is required",
            })}
            placeholder="190 g (6.70 oz)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.physicalSpecifications?.weight && (
            <p className="text-red-500 text-sm">
              {errors.physicalSpecifications.weight.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
            Body Material
          </label>
          <input
            {...register("physicalSpecifications.bodyMaterial", {
              required: "Body material details are required",
            })}
            placeholder="Glass front, Plastic frame, Plastic back"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.physicalSpecifications?.bodyMaterial && (
            <p className="text-red-500 text-sm">
              {errors.physicalSpecifications.bodyMaterial.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Colors</label>
          <input
            {...register("physicalSpecifications.colors", {
              required: "Color options are required",
            })}
            placeholder="Twilight Purple, Dark Gray"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.physicalSpecifications?.colors && (
            <p className="text-red-500 text-sm">
              {errors.physicalSpecifications.colors.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
