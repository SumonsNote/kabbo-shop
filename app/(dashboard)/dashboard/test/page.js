"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const CLOUDINARY_UPLOAD_PRESET = "qrqgoway";
const CLOUDINARY_CLOUD_NAME = "dwe6gs8sp";

export default function TestPage() {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      //   const response = await fetch(
      //     `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      //     {
      //       method: "POST",
      //       body: formData,
      //     }
      //   );

      const response = await fetch(`/api/cloudinary`, {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFile(null);
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop a file here, or click to select file</p>
      )}
      <div>
        {file && (
          <div>
            <img src={URL.createObjectURL(file)} alt={file.name} width={100} />
            <button onClick={uploadFile}>Upload</button>
          </div>
        )}
      </div>
    </div>
  );
}
