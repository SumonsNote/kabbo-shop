import React from "react";

export default function CameraSection({ register, errors }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4">
        Camera Section
      </h3>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">
        Rear Camera
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Resolution</label>
          <input
            {...register("rear_camera.resolution", {
              required: "Rear camera resolution is required",
            })}
            placeholder="50 MP, f/1.8, 26mm (wide), 1/2.55, 0.7µm, PDAF"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.rear_camera?.resolution && (
            <p className="text-red-500 text-sm">
              {errors.rear_camera.resolution.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Macro</label>
          <input
            {...register("rear_camera.macro", {
              required: "Macro camera details are required",
            })}
            placeholder="2 MP, f/2.4, (macro)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.rear_camera?.macro && (
            <p className="text-red-500 text-sm">
              {errors.rear_camera.macro.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Depth</label>
          <input
            {...register("rear_camera.depth", {
              required: "Depth camera details are required",
            })}
            placeholder="2 MP, f/2.4, (depth)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.rear_camera?.depth && (
            <p className="text-red-500 text-sm">
              {errors.rear_camera.depth.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Features</label>
          <input
            {...register("rear_camera.features", {
              required: "Camera features are required",
            })}
            placeholder="LED flash, HDR, Panorama, AI scene detection, Face detection"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.rear_camera?.features && (
            <p className="text-red-500 text-sm">
              {errors.rear_camera.features.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
            Video Recording
          </label>
          <input
            {...register("rear_camera.recording", {
              required: "Video recording details are required",
            })}
            placeholder="1080P @30FPS"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.rear_camera?.recording && (
            <p className="text-red-500 text-sm">
              {errors.rear_camera.recording.message}
            </p>
          )}
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">
        Front Camera
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Resolution</label>
          <input
            {...register("front_camera.resolution", {
              required: "Front camera resolution is required",
            })}
            placeholder="8 MP, f/2.0, 26mm (wide), 1/4, 1.12µm"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.front_camera?.resolution && (
            <p className="text-red-500 text-sm">
              {errors.front_camera.resolution.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Features</label>
          <input
            {...register("front_camera.features", {
              required: "Front camera features are required",
            })}
            placeholder="HDR"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.front_camera?.features && (
            <p className="text-red-500 text-sm">
              {errors.front_camera.features.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
            Video Recording
          </label>
          <input
            {...register("front_camera.recording", {
              required: "Video recording details are required",
            })}
            placeholder="1080P @30FPS"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.front_camera?.recording && (
            <p className="text-red-500 text-sm">
              {errors.front_camera.recording.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
