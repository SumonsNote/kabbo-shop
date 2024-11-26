"use client";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import UploadImage from "../add/form/UploadImage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

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
    <label className="block text-sm font-medium text-gray-500 mb-1 capitalize">
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

const TextareaField = ({ label, value, onChange, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      {label} {value}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-md border-gray-300 shadow-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-600 p-2"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-md border-gray-300 shadow-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-600 p-2"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ProductDashboard = ({ productData = {} }) => {
  console.log(productData);
  const uploadImageRef = useRef();
  const router = useRouter();
  const handleReset = () => {
    uploadImageRef.current.resetImage();
    setColorText("");
  };
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(productData);
  const [images, setImages] = useState([]);
  const [colorText, setColorText] = useState("");
  useEffect(() => {
    if (productData) {
      setFormData(productData);
    }
  }, [productData]);

  const handleNestedChange = (mainField, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [mainField]: {
        ...prev[mainField],
        [subField]: value,
      },
    }));
  };

  const removeImage = (index) => {
    const updatedImages = [...formData?.image];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, image: updatedImages });
  };

  const addImage = () => {
    const image = { url: images, colors: colorText };
    const updatedImages = [...formData?.image, image];
    setFormData({ ...formData, image: updatedImages });
    handleReset();
    console.log({
      images,
      colorText,
    });
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "display", label: "Display" },
    { id: "processor", label: "Processor" },
    { id: "memory", label: "Memory" },
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
                value={formData?.product_name}
                onChange={(e) =>
                  setFormData({ ...formData, product_name: e.target.value })
                }
                disabled={!isEditing}
              />
              <InputField
                label="Model"
                value={formData?.product_model}
                onChange={(e) =>
                  setFormData({ ...formData, product_model: e.target.value })
                }
                disabled={!isEditing}
              />
              <InputField
                label="Brand"
                value={formData?.brand_name}
                onChange={(e) =>
                  setFormData({ ...formData, brand_name: e.target.value })
                }
                disabled={!isEditing}
              />
              <InputField
                label="Description"
                value={formData?.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={!isEditing}
              />

              <SelectField
                label="Status"
                value={formData?.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
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
            <InputField
              label="Size"
              value={formData?.display?.size}
              onChange={(e) =>
                handleNestedChange("display", "size", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Resolution"
              value={formData?.display?.resolution}
              onChange={(e) =>
                handleNestedChange("display", "resolution", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Type"
              value={formData?.display?.type}
              onChange={(e) =>
                handleNestedChange("display", "type", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Refresh Rate"
              value={formData?.display?.refreshRate}
              onChange={(e) =>
                handleNestedChange("display", "refreshRate", e.target.value)
              }
              disabled={!isEditing}
            />

            <InputField
              label="Brightness"
              value={formData?.display?.brightness}
              onChange={(e) =>
                handleNestedChange("display", "brightness", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Features"
              value={formData?.display?.features}
              onChange={(e) =>
                handleNestedChange("display", "features", e.target.value)
              }
              disabled={!isEditing}
            />
          </div>
        );

      case "processor":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="CPU Type"
              value={formData?.processor?.cpuType}
              onChange={(e) =>
                handleNestedChange("processor", "cpuType", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Chipset"
              value={formData?.processor?.chipset}
              onChange={(e) =>
                handleNestedChange("processor", "chipset", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="GPU"
              value={formData?.processor?.gpu}
              onChange={(e) =>
                handleNestedChange("processor", "gpu", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="CPU Speed"
              value={formData?.processor?.cpuSpeed}
              onChange={(e) =>
                handleNestedChange("processor", "cpuSpeed", e.target.value)
              }
              disabled={!isEditing}
            />
          </div>
        );

      case "memory":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Internal Storage"
              value={formData?.memory.internalStorage}
              onChange={(e) =>
                handleNestedChange("memory", "internalStorage", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Expandable Storage"
              value={formData?.memory.externalStorage}
              onChange={(e) =>
                handleNestedChange("memory", "externalStorage", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="RAM"
              value={formData?.memory.ram}
              onChange={(e) =>
                handleNestedChange("memory", "ram", e.target.value)
              }
              disabled={!isEditing}
            />
          </div>
        );

      case "camera":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Rear Camera</h3>
              <InputField
                label="Main Camera"
                value={formData?.rear_camera?.resolution}
                onChange={(e) =>
                  handleNestedChange(
                    "rear_camera",
                    "resolution",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <InputField
                label="Depth Camera"
                value={formData?.rear_camera?.depth}
                onChange={(e) =>
                  handleNestedChange("rear_camera", "depth", e.target.value)
                }
                disabled={!isEditing}
              />
              <InputField
                label="Macro Camera"
                value={formData?.rear_camera?.macro}
                onChange={(e) =>
                  handleNestedChange("rear_camera", "macro", e.target.value)
                }
                disabled={!isEditing}
              />

              <InputField
                label="Recording"
                value={formData?.rear_camera?.recording}
                onChange={(e) =>
                  handleNestedChange("rear_camera", "recording", e.target.value)
                }
                disabled={!isEditing}
              />
              <InputField
                label="Features"
                value={formData?.rear_camera?.features}
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
                value={formData?.front_camera?.resolution}
                onChange={(e) =>
                  handleNestedChange(
                    "front_camera",
                    "resolution",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />{" "}
              <InputField
                label="Recording"
                value={formData?.front_camera?.recording}
                onChange={(e) =>
                  handleNestedChange(
                    "front_camera",
                    "recording",
                    e.target.value
                  )
                }
                disabled={!isEditing}
              />
              <InputField
                label="Features"
                value={formData?.front_camera?.features}
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
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <InputField
              label="Network"
              value={formData?.network_connectivity?.network}
              onChange={(e) =>
                handleNestedChange(
                  "network_connectivity",
                  "network",
                  e.target.value
                )
              }
              disabled={!isEditing}
            />{" "}
            <InputField
              label="Audio Jack"
              value={formData?.network_connectivity?.audioJack}
              onChange={(e) =>
                handleNestedChange(
                  "network_connectivity",
                  "audioJack",
                  e.target.value
                )
              }
              disabled={!isEditing}
            />{" "}
            <InputField
              label="Gps"
              value={formData?.network_connectivity?.gps}
              onChange={(e) =>
                handleNestedChange(
                  "network_connectivity",
                  "gps",
                  e.target.value
                )
              }
              disabled={!isEditing}
            />
            <InputField
              label="WiFi"
              value={formData?.network_connectivity?.wifi}
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
              value={formData?.network_connectivity?.bluetooth}
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
              value={formData?.network_connectivity?.usb}
              onChange={(e) =>
                handleNestedChange(
                  "network_connectivity",
                  "usb",
                  e.target.value
                )
              }
              disabled={!isEditing}
            />
            <SelectField
              label="nfc"
              value={formData?.network_connectivity?.nfc?.toLowerCase()}
              onChange={(e) =>
                handleNestedChange(
                  "network_connectivity",
                  "nfc",
                  e.target.value
                )
              }
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              disabled={!isEditing}
            />
          </div>
        );

      case "features":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Sensors"
              value={formData?.features?.sensors}
              onChange={(e) =>
                handleNestedChange("features", "sensors", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="fingerprint"
              value={formData?.features?.fingerprint}
              onChange={(e) =>
                handleNestedChange("features", "fingerprint", e.target.value)
              }
              disabled={!isEditing}
            />
          </div>
        );

      case "physical":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Weight"
              value={formData?.physical_specification?.weight}
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
              value={formData?.physical_specification?.dimension}
              onChange={(e) =>
                handleNestedChange(
                  "physical_specification",
                  "dimension",
                  e.target.value
                )
              }
              disabled={!isEditing}
            />
            <InputField
              label="colors"
              value={formData?.physical_specification?.colors}
              onChange={(e) =>
                handleNestedChange(
                  "physical_specification",
                  "colors",
                  e.target.value
                )
              }
              disabled={!isEditing}
            />
            <InputField
              label="Body Material"
              value={formData?.physical_specification?.body_material}
              onChange={(e) =>
                handleNestedChange(
                  "physical_specification",
                  "body_material",
                  e.target.value
                )
              }
              disabled={!isEditing}
            />
          </div>
        );

      case "images":
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {formData?.image.map((img, index) => (
              <div
                key={index}
                className="relative group h-72 w-72 shadow-xl rounded-xl shadow-black/50 bg-black p-1 overflow-hidden"
              >
                <Image
                  width={400}
                  height={400}
                  src={img?.url}
                  alt={img?.colors}
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2  backdrop-blur rounded-full bg-black/30 tracking-[.5rem] text-white ring-white ring-[1px] uppercase p-2">
                  <p className="text-xs ">{img?.colors}</p>
                </div>
                {isEditing && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="bg-red-500 text-white p-1 rounded"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isEditing && (
              <div className="space-y-4 w-full">
                <div className="">
                  <div className="flex flex-col items-center gap-2 p-4 border rounded-md">
                    <label className="text-sm font-medium text-gray-500">
                      Image
                    </label>
                    <UploadImage
                      setValue={(obj, value) => {
                        setImages(value);
                      }}
                      index={formData?.image.length}
                      ref={uploadImageRef}
                    />
                    <label className="text-sm font-medium text-gray-500">
                      Image Colors
                    </label>
                    <input
                      type="text"
                      value={colorText}
                      onChange={(e) => setColorText(e.target.value)}
                      className="px-3 py-2 border text-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Enter image colors (e.g., red, blue)"
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      className="mt-2 p-2 text-white  rounded-lg inline-flex items-center gap-2 ring-1"
                    >
                      <Plus className="w-5 h-5" />
                      Add Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const handleSave = async () => {
    if (isEditing) {
      // Save changes
      // You can implement your save logic here
      // For example, you can make an API call to update the product
      // and then update the formData state with the updated data
      setIsEditing(false);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            _id: productData._id,
          }),
        }
      );
      if (res.ok) {
        router.refresh();
        toast.success("Product updated successfully!");
      }
      // setFormData(updatedFormData);
    } else {
      // Start editing
      setIsEditing(true);
    }
  };
  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full mx-auto  rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-500">Product Details</h1>
          <button
            onClick={handleSave}
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
