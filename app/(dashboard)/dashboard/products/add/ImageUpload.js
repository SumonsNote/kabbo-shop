"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import { FcCheckmark, FcHighPriority } from "react-icons/fc";
import { FcUpload } from "react-icons/fc";
import ProgressBar from "../../components/ui/ProgressBar";
import { CgSpinner } from "react-icons/cg";

export default function CloudinaryUploader() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState({
    index: "",
    isUploading: false,
  });
  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        file: file,
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: true,
  });

  const uploadFile = async (file, index, e) => {
    e.preventDefault();
    setIsUploading({ index, isUploading: true });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/cloudinary`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFiles((prevFiles) =>
        prevFiles.map((f, i) =>
          i === index ? { ...f, progress: 100, uploaded: true } : f
        )
      );
      if (data.uploaded) {
        setIsUploading({ index, isUploading: false });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setFiles((prevFiles) =>
        prevFiles.map((f, i) => (i === index ? { ...f, error: true } : f))
      );
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mx-auto p-6">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <BiCloudUpload className="w-16 h-16 mx-auto" />
        <p className="mt-2 text-sm text-gray-600">
          Drag &apos;n&apos; drop some images here, or click to select files
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-6 space-y-4 grid grid-cols-2 gap-4">
          {files.map((file, index) => (
            <li
              key={file.name}
              className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4 mt-4"
            >
              <Image
                src={file.preview}
                alt={file.name}
                width="64"
                height="64"
                className="h-16 w-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                {/* <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p> */}
                <ProgressBar
                  value={file.progress}
                  label={file.name}
                  className="w-full mt-2"
                />
              </div>
              {file.uploaded ? (
                <FcCheckmark className="h-5 w-5 text-green-500" />
              ) : file.error ? (
                <FcHighPriority className="h-5 w-5 text-red-500" />
              ) : (
                <button
                  onClick={(e) => uploadFile(file.file, index, e)}
                  size="sm"
                  className="ml-2 text-xs bg-green-200 p-1 rounded-full"
                  disabled={
                    isUploading.index === index && isUploading.isUploading
                  }
                >
                  {isUploading.index === index && isUploading.isUploading ? (
                    <CgSpinner className="animate-spin" />
                  ) : (
                    <FcUpload />
                  )}
                </button>
              )}
              <button
                onClick={() => removeFile(index)}
                variant="ghost"
                size="icon"
                className="ml-2"
              >
                <AiFillCloseCircle className="h-4 w-4 text-red-400" />
                <span className="sr-only">Remove file</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
