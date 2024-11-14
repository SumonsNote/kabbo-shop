import { useFetchBrandsByCategoryQuery } from "@/store/slices/brandApi";
import { useFetchCategoriesQuery } from "@/store/slices/CategoryApi";

export default function BasicInfoSection({ register, errors, watch }) {
  const { data } = useFetchCategoriesQuery();
  const categories = data?.categories || [];
  const selectedCategoryName = watch("category_name");
  console.log(selectedCategoryName);
  const { data: brandsData } =
    useFetchBrandsByCategoryQuery(selectedCategoryName);
  const brands = brandsData?.brands || [];

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-2">
        Basic Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500">
        {/* Name, Model, Description fields */}

        <div className="form-group">
          <label className="block text-gray-500 font-medium">Category</label>
          <select
            {...register("category_name", { required: "Category is required" })}
            className="w-full p-2 border bg-inherit border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.categoryName} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>

          {errors.category_name && (
            <p className="text-red-500 text-sm">
              {errors.category_name.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="block text-gray-500 font-medium">Brand</label>
          <select
            {...register("brand_name", { required: "Brand is required" })}
            className="w-full p-2 border bg-inherit border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {brands.map((brand) => (
              <option key={brand.title} value={brand.title}>
                {brand.title}
              </option>
            ))}
          </select>

          {errors.brand_name && (
            <p className="text-red-500 text-sm">{errors.brand_name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-500 font-medium">Name</label>
          <input
            {...register("product_name", { required: "Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
          />
          {errors.product_name && (
            <p className="text-red-500 text-sm">
              {errors.product_name.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-gray-500 font-medium">Model</label>
          <input
            {...register("product_model", { required: "Model is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Model Name"
          />
          {errors.product_model && (
            <p className="text-red-500 text-sm">
              {errors.product_model.message}
            </p>
          )}
        </div>
        <div className="form-group col-span-2">
          <label className="block text-gray-500 font-medium">Description</label>
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
