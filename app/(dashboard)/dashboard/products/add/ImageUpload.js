"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Upload, X } from "lucide-react";
import Image from "next/image";

// You would typically store this in an environment variable
const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset";
const CLOUDINARY_CLOUD_NAME = "your_cloud_name";

export default function CloudinaryUploader() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
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

  const uploadFile = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFiles((prevFiles) =>
        prevFiles.map((f, i) =>
          i === index ? { ...f, progress: 100, uploaded: true } : f
        )
      );
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
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
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
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                {/* <Progress value={file.progress} className="w-full mt-2" /> */}
              </div>
              {file.uploaded ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : file.error ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <button
                  onClick={() => uploadFile(new File([], file.name), index)}
                  size="sm"
                  className="ml-2"
                >
                  Upload
                </button>
              )}
              <button
                onClick={() => removeFile(index)}
                variant="ghost"
                size="icon"
                className="ml-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
