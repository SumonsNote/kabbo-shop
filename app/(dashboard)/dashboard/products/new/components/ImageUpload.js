import { UploadCloud, X } from "lucide-react";
import { useState } from "react";

export default function ImageUpload({ onImagesChange }) {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/cloudinary`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Uploaded image URL:", data);
          return data.url; // Assuming the API returns the uploaded image URL
        }
        throw new Error("Upload failed");
      } catch (error) {
        console.error("Upload error:", error);
        return null;
      }
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    const validUrls = uploadedUrls.filter((url) => url !== null);

    setUploadedImages((prev) => [...prev, ...validUrls]);
    onImagesChange([...uploadedImages, ...validUrls]);

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    onImagesChange(uploadedImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
        accept="image/*"
      />
      <label
        htmlFor="image-upload"
        className="inline-flex justify-center gap-4 items-center h-24 text-xl w-full text-center py-2 px-4 border border-dashed border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
      >
        <UploadCloud /> Upload Images
      </label>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
