"use client";

import {
  useAddOfferMutation,
  useUpdateOfferMutation,
} from "@/store/slices/OfferApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import { toast } from "react-toastify";

const OfferForm = ({ onClose, offer, isEdit }) => {
  const [imagePreview, setImagePreview] = useState(offer?.image);
  const [subImagePreviews, setSubImagePreviews] = useState(
    offer?.sub_img || []
  );
  const [subImages, setSubImages] = useState([]);

  const [addOffer, { isLoading, isSuccess, data }] = useAddOfferMutation();
  const [updateOffer, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateOfferMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      image: offer?.image || null,
      sub_files: offer?.sub_img || [],

      title: offer?.title || "",
      brand: offer?.brand || "",
      regular_price: offer?.regular_price || "",
      discount_price: offer?.discount_price || "",
    },
  });

  useEffect(() => {
    if (offer) {
      setImagePreview(offer.image);
      setSubImagePreviews(offer.sub_img || []);
    }
  }, [offer]);

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

  const handleSubImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newPreviews = files.map((file) => {
      if (file.size > 2000000) {
        toast.error("File size should be less than 2MB.");
        return null;
      }
      return { file, preview: URL.createObjectURL(file) };
    });

    const validPreviews = newPreviews.filter((item) => item !== null);
    setSubImages([...subImages, ...validPreviews.map((item) => item.file)]);
    setSubImagePreviews([...subImagePreviews, ...validPreviews]);
  };

  const handleRemoveSubImage = (index) => {
    const updatedPreviews = [...subImagePreviews];
    const updatedFiles = [...subImages];
    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);

    setSubImagePreviews(updatedPreviews);
    setSubImages(updatedFiles);
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    console.log("Sub Images State:", subImages);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("regular_price", data.regular_price);
    formData.append("discount_price", data.discount_price);

    // Log details of main image
    if (data.image) {
      console.log("Main Image:", {
        name: data.image.name,
        size: data.image.size,
        type: data.image.type,
      });

      if (data.image.size > 2000000) {
        toast.error("File size should be less than 2MB.");
        return;
      }
      formData.append("file", data.image);
    }

    // Append sub-images with detailed logging
    console.log("Sub Images to Upload:", subImages);
    subImages.forEach((file, index) => {
      console.log(`Sub Image ${index + 1}:`, {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      if (file.size > 2000000) {
        toast.error(`Sub-image ${index + 1} size should be less than 2MB.`);
        return;
      }
      formData.append("sub_files", file);
    });

    // Log FormData contents (for debugging)
    for (let [key, value] of formData.entries()) {
      console.log(`FormData Entry - ${key}:`, value);
    }

    if (isEdit) {
      formData.append("id", offer._id);
      updateOffer(formData);
    } else {
      addOffer(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Offer created successfully");
      onClose();
    } else if (isUpdated) {
      toast.success("Offer updated successfully");
      onClose();
    }
  }, [isSuccess, isUpdated]);

  return (
    <div className="p-6 space-y-4 dark:bg-gray-900 dark:text-gray-300">
      <h2>{isEdit ? "Edit Offer" : "Add an Offer"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Main Image Upload */}
        <div className="flex items-center justify-center">
          <label
            htmlFor="offer-image-input"
            className="relative border overflow-hidden border-dashed border-gray-600 dark:border-gray-400 dark:text-gray-400 px-4 py-2 rounded-md cursor-pointer w-full h-32 text-sm flex items-center justify-center flex-col gap-2"
          >
            <BiCloudUpload className="text-3xl" /> Upload Main Image
            {imagePreview && (
              <div className="absolute top-0 left-0 right-0 rounded-md">
                <Image
                  src={imagePreview}
                  alt="Main Image Preview"
                  className="object-fill w-full h-32 rounded-md opacity-40"
                  width={300}
                  height={120}
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 ring-1 rounded-full bg-blue-500 hover:bg-red-600 p-1"
                  aria-label="Remove Main Image"
                >
                  <AiFillCloseCircle className="text-2xl" />
                </button>
              </div>
            )}
          </label>
          <input
            id="offer-image-input"
            type="file"
            {...register("image")}
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Sub-Image Upload */}

        <div>
          <h3 className="mb-2">Upload Sub-Images</h3>
          <div className="flex gap-4 flex-wrap">
            {subImagePreviews.map((preview, index) => (
              <div key={index} className="relative w-24 h-24">
                {/* Sub-image preview */}
                <Image
                  src={preview.preview || preview} // Handle both new uploads and existing sub-images
                  alt={`Sub-Image ${index + 1}`}
                  className="object-cover rounded-md"
                  width={96}
                  height={96}
                />
                {/* Remove Sub-image Button */}
                <button
                  onClick={() => handleRemoveSubImage(index)}
                  className="absolute top-0 right-0 ring-1 rounded-full bg-blue-500 hover:bg-red-600 p-1"
                  aria-label="Remove Sub-Image"
                >
                  <AiFillCloseCircle className="text-xl" />
                </button>
              </div>
            ))}
          </div>
          {/* Sub-Image Input */}
          <label
            htmlFor="sub-images-input"
            className="relative border border-dashed border-gray-600 dark:border-gray-400 dark:text-gray-400 px-4 py-2 rounded-md cursor-pointer w-full h-24 text-sm flex items-center justify-center flex-col gap-2 mt-2"
          >
            <BiCloudUpload className="text-3xl" /> Upload Sub-Images
            <input
              id="sub-images-input"
              type="file"
              accept="image/*"
              multiple
              {...register("sub_images")}
              className="hidden"
              onChange={handleSubImageChange}
            />
          </label>
        </div>

        <div className="relative">
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            placeholder="Enter offer title"
          />
          {errors.title && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            {...register("brand", {
              required: "Brand is required",
            })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-blue-500"
            rows="2"
            placeholder="Enter brand title"
          />
          {errors.brand && (
            <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
              {errors.brand.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register("regular_price", {
                required: "Regular price is required",
              })}
              type="number"
              placeholder="Regular Price"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 dark:bg-gray-800"
            />
            {errors.regular_price && (
              <span className="text-red-500 text-sm">
                {errors.regular_price.message}
              </span>
            )}
          </div>
          <div>
            <input
              {...register("discount_price", {
                required: "Discount price is required",
              })}
              type="number"
              placeholder="Discount Price"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 dark:bg-gray-800"
            />
            {errors.discount_price && (
              <span className="text-red-500 text-sm">
                {errors.discount_price.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading || isUpdating}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:text-gray-400 bg-blue-500"
        >
          {isLoading || isUpdating ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default OfferForm;
