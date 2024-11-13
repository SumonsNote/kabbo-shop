import React from "react";

export default function OSFeaturesSection({ register, errors }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mt-8">OS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 font-medium">
            Operating System
          </label>
          <input
            {...register("os.operatingSystem", {
              required: "Operating system is required",
            })}
            placeholder="Android 13"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.os?.operatingSystem && (
            <p className="text-red-500 text-sm">
              {errors.os.operatingSystem.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Custom UI</label>
          <input
            {...register("os.customUI", {
              required: "Custom UI details are required",
            })}
            placeholder="TCL UI 5.0"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.os?.customUI && (
            <p className="text-red-500 text-sm">{errors.os.customUI.message}</p>
          )}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mt-8">Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Fingerprint</label>
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
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Sensors</label>
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
