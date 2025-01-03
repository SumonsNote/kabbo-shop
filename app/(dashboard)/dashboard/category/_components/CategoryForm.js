"use client";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/slices/CategoryApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import { toast } from "react-toastify";

const CategoryForm = ({ category, isEdit, setShowForm }) => {
  const [
    addCategory,
    { isLoading: addLoading, isSuccess: addSuccess, isError: addError },
  ] = useAddCategoryMutation();
  const [
    updateCategory,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateCategoryMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: category?.categoryName || "",
      logo: category?.categoryImg || null,
    },
  });
  const [logoPreview, setLogoPreview] = useState(category?.categoryImg);

  useEffect(() => {
    if (addSuccess) {
      toast.success("Category added successfully!");
      setShowForm();
    } else if (updateSuccess) {
      toast.success("Category updated successfully!");
      setShowForm();
    }

    if (addError) {
      toast.error(
        `Failed to add Category: ${
          addError.message || "Unknown error occurred"
        }`
      );
    } else if (updateError) {
      toast.error(
        `Failed to update Category: ${
          updateError.message || "Unknown error occurred"
        }`
      );
    }
  }, [addSuccess, updateSuccess, addError, updateError]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);

    if (data.logo) {
      if (data.logo.size > 2000000) {
        toast.error("File size should be less than 2MB.");
        return;
      }
      formData.append("file", data.logo);
    }

    if (isEdit) {
      formData.append("id", category._id);
      updateCategory(formData);
    } else {
      addCategory(formData);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 2000000) {
      toast.error("File size should be less than 2MB.");
      return;
    }
    setLogoPreview(URL.createObjectURL(file));
    setValue("logo", file);
  };

  const handleRemoveLogo = (e) => {
    e.preventDefault();
    setValue("logo", null);
    setLogoPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-10 text-left rounded-md min-w-[30rem] dark:text-gray-400"
    >
      {/* Title Input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-bold text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Apple"
          {...register("title", { required: "Title is required" })}
          className="mt-1 h-8 px-4 lowercase w-full border border-gray-300 rounded-md shadow-sm bg-inherit placeholder:text-gray-600 dark:placeholder:text-gray-500 sm:text-sm"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>

      {/* Logo Upload */}
      <div>
        <label htmlFor="logo" className="block text-sm font-bold text-gray-700">
          Logo
        </label>
        <div className="flex items-center justify-center">
          <label
            htmlFor="logo-input"
            className="relative border overflow-hidden border-dashed border-gray-600 dark:text-gray-400 px-4 py-2 rounded-md cursor-pointer w-48 h-48 text-sm flex items-center justify-center flex-col gap-2"
          >
            <BiCloudUpload className="text-3xl" /> Upload Logo
            {logoPreview && (
              <div className="absolute top-0 left-0 right-0">
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  className="object-cover w-48 h-48"
                  width={150}
                  height={150}
                />
                <button
                  onClick={handleRemoveLogo}
                  className="absolute top-0 right-0 ring-1 rounded-full bg-red-500 hover:bg-red-600 p-1"
                  aria-label="Remove Logo"
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            )}
          </label>
          <input
            id="logo-input"
            type="file"
            {...register("logo")}
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={Object.keys(errors).length > 0 || addLoading || updateLoading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-gray-400 bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {addLoading || updateLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CategoryForm;
