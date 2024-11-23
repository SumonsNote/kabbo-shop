"use client";
import { useEffect, useState } from "react";
import { Edit2, Save } from "lucide-react";

export default function PhoneDetails({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(data);
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/iphones/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating iPhone:", error);
    }
  };
  console.log(formData);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <button
          onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {isEditing ? (
            <Save className="w-4 h-4" />
          ) : (
            <Edit2 className="w-4 h-4" />
          )}
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <table className="w-full">
            <tbody>
              {[
                { label: "Model", key: "model" },
                { label: "Price", key: "price" },
                { label: "Storage", key: "storage" },
                { label: "RAM", key: "ram" },
                { label: "Color", key: "colors" },
                { label: "Region", key: "region" },
              ]?.map(({ label, key }) => (
                <tr key={key} className="border-b">
                  <td className="py-2 font-medium">{label}</td>
                  <td className="py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      formData[key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Usage Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Information</h2>
          <table className="w-full">
            <tbody>
              {[
                { label: "Used Duration", key: "usedDuration" },
                { label: "Battery Health", key: "batteryHealth" },
                { label: "Scratches", key: "scratches" },
                { label: "Dents", key: "dents" },
                { label: "Box Status", key: "box" },
                { label: "Warranty Status", key: "warrantyStatus" },
              ].map(({ label, key }) => (
                <tr key={key} className="border-b">
                  <td className="py-2 font-medium">{label}</td>
                  <td className="py-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      formData[key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Images */}
        <div className="col-span-full">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="grid grid-cols-4 gap-4">
            {data?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${data.name} - ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        {/* Description */}
        <div className="bg-white rounded-lg shadow p-6 col-span-full">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: data.specifications }}
          ></p>
        </div>
      </div>
    </div>
  );
}
