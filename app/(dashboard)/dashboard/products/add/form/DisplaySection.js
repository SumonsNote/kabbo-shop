export default function DisplaySection({ register, errors }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Display</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="block text-gray-700 font-medium">
            Display Size
          </label>
          <input
            {...register("display.size", {
              required: "Display size is required",
            })}
            placeholder="6.75 Inch"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.display?.size && (
            <p className="text-red-500 text-sm">
              {errors.display.size.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium">Type</label>
          <input
            {...register("display.type", {
              required: "Display type is required",
            })}
            placeholder="IPS LCD"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.display?.type && (
            <p className="text-red-500 text-sm">
              {errors.display.type.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium">Resolution</label>
          <input
            {...register("display.resolution", {
              required: "Resolution is required",
            })}
            placeholder="HD+ (720x1600 pixels)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.display?.resolution && (
            <p className="text-red-500 text-sm">
              {errors.display.resolution.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium">
            Refresh Rate
          </label>
          <input
            {...register("display.refreshRate", {
              required: "Refresh rate is required",
            })}
            placeholder="90Hz"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.display?.refreshRate && (
            <p className="text-red-500 text-sm">
              {errors.display.refreshRate.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium">Brightness</label>
          <input
            {...register("display.brightness", {
              required: "Brightness is required",
            })}
            placeholder="400 nits"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.display?.brightness && (
            <p className="text-red-500 text-sm">
              {errors.display.brightness.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium">Features</label>
          <input
            {...register("display.features", {
              required: "Features are required",
            })}
            placeholder="Display ratio: 20:9, Screen-to-body ratio: 90%, Contrast ratio: 1500:1"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.display?.features && (
            <p className="text-red-500 text-sm">
              {errors.display.features.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
