import React from "react";

export default function OSFeaturesSection({ register, errors }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">
        operating_system
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
            Operating System
          </label>
          <input
            {...register("operating_system.operatingSystem", {
              required: "Operating system is required",
            })}
            placeholder="Android 13"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.operating_system?.operatingSystem && (
            <p className="text-red-500 text-sm">
              {errors.operating_system.operatingSystem.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Custom UI</label>
          <input
            {...register("operating_system.customUI", {
              required: "Custom UI details are required",
            })}
            placeholder="TCL UI 5.0"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.operating_system?.customUI && (
            <p className="text-red-500 text-sm">
              {errors.operating_system.customUI.message}
            </p>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">
        Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Fingerprint</label>
          <input
            {...register("features.fingerprint", {
              required: "Fingerprint details are required",
            })}
            placeholder="Side-Mounted"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.features?.fingerprint && (
            <p className="text-red-500 text-sm">
              {errors.features.fingerprint.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Sensors</label>
          <input
            {...register("features.sensors", {
              required: "Sensor details are required",
            })}
            placeholder="Accelerometer (G sensor), Proximity sensor, Light sensor"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.features?.sensors && (
            <p className="text-red-500 text-sm">
              {errors.features.sensors.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
