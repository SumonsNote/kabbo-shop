import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";

const BrandForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      logo: "",
      category: "mobile",
      status: "active",
    },
  });
  const [logoPreview, setLogoPreview] = useState(null);

  const onSubmit = async (data) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", data.file);

    try {
      const response = fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      });

      const { secure_url } = await response.json();
      setValue("logo", secure_url);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    setLogoPreview(URL.createObjectURL(file));
  };
  const handleRemoveLogo = (e) => {
    console.log("remove log");
    setValue("logo", null);
    setLogoPreview(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-10 w-full">
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Apple "
          {...register("title", { required: "Title is required" })}
          className="mt-1 h-8 px-4 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>

      {/* Logo Field */}
      <div>
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700"
        >
          Logo
        </label>
        <div className="flex items-center">
          <label
            htmlFor="logo-input"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md cursor-pointer w-1/2"
          >
            Upload Logo
          </label>
          <input
            id="logo-input"
            type="file"
            {...register("logo")}
            className="hidden"
            onChange={handleLogoChange}
          />
          {logoPreview && (
            <div className="ml-4 relative">
              <Image
                src={logoPreview}
                alt="Logo Preview"
                className=" object-contain"
                width={150}
                height={150}
              />
              <button
                onClick={handleRemoveLogo}
                className="absolute top-0 right-0 ring-1  rounded-full   bg-red-500 hover:bg-red-600"
              >
                <AiFillCloseCircle />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          id="category"
          type="text"
          disabled
          {...register("category", { required: "Category is required" })}
          className="mt-1 capitalize h-8 px-4 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          defaultValue="active"
          className="mt-1 h-8 px-4 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default BrandForm;
