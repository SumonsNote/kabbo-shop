export default function BasicInfoSection({ register, errors }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name, Model, Description fields */}

        <div className="form-group">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-medium">Model</label>
          <input
            {...register("model", { required: "Model is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Model Name"
          />
          {errors.model && (
            <p className="text-red-500 text-sm">{errors.model.message}</p>
          )}
        </div>
        <div className="form-group col-span-2">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "description is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="description"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
