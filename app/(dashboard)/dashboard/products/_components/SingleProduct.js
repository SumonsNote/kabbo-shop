"use client";
import React, { useState } from "react";

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-semibold ${
      active
        ? "border-b-2 border-blue-500 text-blue-600"
        : "text-gray-600 hover:text-blue-500"
    }`}
  >
    {children}
  </button>
);

const InputField = ({ label, value, onChange, disabled, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-md border-gray-300 shadow-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-600 p-2"
    />
  </div>
);

const ProductDashboard = ({ productData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(productData);

  const handleNestedChange = (mainField, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [mainField]: {
        ...prev[mainField],
        [subField]: value,
      },
    }));
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "display", label: "Display" },
    { id: "hardware", label: "Hardware" },
    { id: "camera", label: "Camera" },
    { id: "connectivity", label: "Connectivity" },
    { id: "features", label: "Features" },
    { id: "physical", label: "Physical" },
    { id: "images", label: "Images" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField
                label="Product Name"
                value={formData.product_name}
                onChange={(e) =>
                  setFormData({ ...formData, product_name: e.target.value })
                }
                disabled={!isEditing}
              />
              <InputField
                label="Model"
                value={formData.product_model}
                onChange={(e) =>
                  setFormData({ ...formData, product_model: e.target.value })
                }
                disabled={!isEditing}
              />
              <InputField
                label="Brand"
                value={formData.brand_name}
                onChange={(e) =>
                  setFormData({ ...formData, brand_name: e.target.value })
                }
                disabled={!isEditing}
              />
              <InputField
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Product Status</h3>
              {[
                "is_new",
                "is_trending",
                "is_offer",
                "top_seller",
                "best_seller",
              ].map((status) => (
                <label key={status} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData[status]}
                    onChange={(e) =>
                      setFormData({ ...formData, [status]: e.target.checked })
                    }
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    {status
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case "display":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField
                label="Size"
                value={formData.display.size}
                onChange={(e) =>
                  handleNestedChange("display", "size", e.target.value)
                }
                disabled={!isEditing}
              />
              <InputField
                label="Resolution"
                value={formData.display.resolution}
                onChange={(e) =>
                  handleNestedChange("display", "resolution", e.target.value)
                }
                disabled={!isEditing}
              />
              <InputField
                label="Type"
                value={formData.display.type}
                onChange={(e) =>
                  handleNestedChange("display", "type", e.target.value)
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        );

      case "hardware":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Processor</h3>
              <InputField
                label="Type"
                value={formData.processor.type}
                onChange={(e) =>
                  handleNestedChange("processor", "type", e.target.value)
                }
                disabled={!isEditing}
              />
              <InputField
                label="Chipset"
                value={formData.processor.chipset}
                onChange={(e) =>
                  handleNestedChange("processor", "chipset", e.target.value)
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Memory</h3>
              <InputField
                label="RAM"
                value={formData.memory.ram}
                onChange={(e) =>
                  handleNestedChange("memory", "ram", e.target.value)
                }
                disabled={!isEditing}
              />
              <InputField
                label="Storage"
                value={formData.memory.storage}
                onChange={(e) =>
                  handleNestedChange("memory", "storage", e.target.value)
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        );

      case "camera":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Rear Camera</h3>
              <InputField
                label="Megapixels"
                value={formData.rear_camera.megapixels}
                onChange={(e) =>
                  handleNestedChange(
                    "rear_camera",
                    "megapixels",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <InputField
                label="Features"
                value={formData.rear_camera.features}
                onChange={(e) =>
                  handleNestedChange("rear_camera", "features", e.target.value)
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Front Camera</h3>
              <InputField
                label="Megapixels"
                value={formData.front_camera.megapixels}
                onChange={(e) =>
                  handleNestedChange(
                    "front_camera",
                    "megapixels",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <InputField
                label="Features"
                value={formData.front_camera.features}
                onChange={(e) =>
                  handleNestedChange("front_camera", "features", e.target.value)
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        );

      case "connectivity":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField
                label="WiFi"
                value={formData.network_connectivity.wifi}
                onChange={(e) =>
                  handleNestedChange(
                    "network_connectivity",
                    "wifi",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <InputField
                label="Bluetooth"
                value={formData.network_connectivity.bluetooth}
                onChange={(e) =>
                  handleNestedChange(
                    "network_connectivity",
                    "bluetooth",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <InputField
                label="USB"
                value={formData.network_connectivity.usb}
                onChange={(e) =>
                  handleNestedChange(
                    "network_connectivity",
                    "usb",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <div className="space-y-2">
                {["gps", "nfc"].map((feature) => (
                  <label key={feature} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.network_connectivity[feature]}
                      onChange={(e) =>
                        handleNestedChange(
                          "network_connectivity",
                          feature,
                          e.target.checked
                        )
                      }
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      {feature.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "features":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField
                label="Sensors"
                value={formData.features.sensors}
                onChange={(e) =>
                  handleNestedChange("features", "sensors", e.target.value)
                }
                disabled={!isEditing}
              />
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.features.waterproof}
                  onChange={(e) =>
                    handleNestedChange(
                      "features",
                      "waterproof",
                      e.target.checked
                    )
                  }
                  disabled={!isEditing}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Waterproof</span>
              </label>
            </div>
          </div>
        );

      case "physical":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField
                label="Weight"
                value={formData.physical_specification.weight}
                onChange={(e) =>
                  handleNestedChange(
                    "physical_specification",
                    "weight",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <InputField
                label="Dimensions"
                value={formData.physical_specification.dimensions}
                onChange={(e) =>
                  handleNestedChange(
                    "physical_specification",
                    "dimensions",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        );

      case "images":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.image.map((img, index) => (
              <div key={img._id.$oid} className="relative group">
                <img
                  src={img.url}
                  alt={img.color_variant}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                  <p className="text-sm">{img.color_variant}</p>
                </div>
                {isEditing && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-red-500 text-white p-1 rounded">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isEditing && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center">
                <button className="text-blue-500 hover:text-blue-600">
                  + Add Image
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full mx-auto  rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-500">Product Details</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md ${
              isEditing
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isEditing ? "Save Changes" : "Edit Product"}
          </button>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap px-6">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </nav>
        </div>

        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProductDashboard;
