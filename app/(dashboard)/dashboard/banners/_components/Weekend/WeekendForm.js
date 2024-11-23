"use client";

import {
  useAddWeekendMutation,
  useUpdateWeekendMutation,
} from "../../../../../../store/slices/weekendApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import { toast } from "react-toastify";

const WeekendForm = ({ onClose, weekend, isEdit }) => {
  const [imagePreview, setImagePreview] = useState(weekend?.image);
  const [addWeekend, { isLoading, isSuccess, data }] = useAddWeekendMutation();
  const [updateWeekend, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateWeekendMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: weekend?.title || "",
      short_description: weekend?.short_description || "",
      image: weekend?.image || null,
    },
  });

  useEffect(() => {
    if (weekend) {
      setImagePreview(weekend.image);
    }
  }, [weekend]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 2000000) {
      toast.error("File size should be less than 2MB.");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setValue("image", file);
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setValue("image", null);
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("short_description", data.short_description);

    if (data.image) {
      if (data.image.size > 2000000) {
        toast.error("File size should be less than 2MB.");
        return;
      }
      formData.append("file", data.image);
    }
    if (isEdit) {
      console.log(isEdit);
      formData.append("id", weekend._id);
      updateWeekend(formData);
    } else {
      addWeekend(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Weekend created successfully");
      onClose();
    } else if (isUpdated) {
      toast.success("Weekend updated successfully");
      onClose();
    }
  }, [isSuccess, isUpdated]);

  return (
    <div className="p-6 space-y-4 dark:bg-gray-900 dark:text-gray-300">
      <h2>Add Weekend</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-center">
          <label
            htmlFor="weekend-image-input"
            className="relative border overflow-hidden border-dashed border-gray-600 dark:border-gray-400 dark:text-gray-400 px-4 py-2 rounded-md cursor-pointer w-full h-32 text-sm flex items-center justify-center flex-col gap-2"
          >
            <BiCloudUpload className="text-3xl" /> Upload Weekend Image
            {imagePreview && (
              <div className="absolute top-0 left-0 right-0 rounded-md">
                <Image
                  src={imagePreview}
                  alt="Logo Preview"
                  className="object-fill w-full h-32 rounded-md opacity-40"
                  width={300}
                  height={120}
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 ring-1 rounded-full bg-blue-500 hover:bg-red-600 p-1"
                  aria-label="Remove Logo"
                >
                  <AiFillCloseCircle className="text-2xl" />
                </button>
              </div>
            )}
          </label>
          <input
            id="weekend-image-input"
            type="file"
            {...register("image")}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="relative">
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter banner title"
          />
          {errors.title && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            {...register("short_description", {
              required: "Short Description is required",
            })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            rows="2"
            placeholder="Enter weekend short description"
          />
          {errors.short_description && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.short_description.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading || isUpdating}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-gray-400 bg-blue-500"
        >
          {isLoading || isUpdating ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default WeekendForm;
