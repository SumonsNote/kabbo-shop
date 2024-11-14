import { useUploadMutation } from "@/store/slices/uplodApi";
import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";

export default function UploadImage({ setValue, index }) {
  const [logoPreview, setLogoPreview] = useState(null);
  const [upload, { isLoading, isSuccess, data, reset }] = useUploadMutation();
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 2000000) {
      toast.error("File size should be less than 2MB.");
      return;
    }
    // setLogoPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    upload(formData);
    // setValue("logo", file);
  };
  useEffect(() => {
    if (isLoading) {
      console.log("Uploading...");
    }
    if (isSuccess) {
      setValue(`image.${index}.url`, data);
      setLogoPreview(data);
    }
  }, [isSuccess, isLoading]);
  const handleRemoveLogo = (e) => {
    e.preventDefault();
    reset();
    setValue("logo", null);
    setLogoPreview(null);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={`logo-input-${index}`}
        className="relative border overflow-hidden border-dashed border-gray-600 dark:text-gray-400 px-4 py-2 rounded-md cursor-pointer w-48 h-48 text-sm flex items-center justify-center flex-col gap-2"
      >
        <BiCloudUpload className="text-3xl" /> Upload Product Image
        {logoPreview && (
          <div className="absolute top-0 left-0 right-0 bg-slate-400">
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
        {isLoading && (
          <Lottie
            path="/opener-loading.json" // Adjusted for direct path
            loop
            autoplay
          />
        )}
        {isSuccess && (
          <Lottie
            path="/success.json" // Adjusted for direct path
            loop={isLoading}
            autoplay
          />
        )}
      </label>
      <input
        id={`logo-input-${index}`}
        type="file"
        accept="image/*"
        className="hidden"
        required
        onChange={handleLogoChange}
      />
    </div>
  );
}
