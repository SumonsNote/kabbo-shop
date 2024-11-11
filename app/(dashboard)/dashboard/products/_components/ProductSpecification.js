"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const ProductSpecification = ({ product }) => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    { name: "Physical Specification", key: "physical_specification" },
    { name: "Network", key: "network_connectivity" },
    { name: "Display", key: "display" },
    { name: "Processor", key: "processor" },
    { name: "Memory", key: "memory" },
    { name: "Main Camera", key: "rear_camera" },
    { name: "Selfie Camera", key: "front_camera" },
    { name: "OS", key: "operating_system" },
    { name: "Connectivity", key: "network_connectivity" },
    { name: "Features", key: "features" },
    { name: "Battery", key: "battery" },
  ];

  const renderSectionContent = (section) => {
    switch (section.key) {
      case "physical_specification":
        return (
          <div>
            <p>Weight: {product?.product?.physical_specification?.weight}</p>
            <p>
              Dimensions: {product?.product?.physical_specification?.dimensions}
            </p>
          </div>
        );
      case "network_connectivity":
        return (
          <div>
            <p>WiFi: {product?.product?.network_connectivity.wifi}</p>
            <p>
              Bluetooth: {product?.product?.network_connectivity?.bluetooth}
            </p>
            <p>USB: {product?.product?.network_connectivity?.usb}</p>
            <p>
              GPS: {product?.product?.network_connectivity?.gps ? "Yes" : "No"}
            </p>
            <p>
              NFC: {product?.product?.network_connectivity?.nfc ? "Yes" : "No"}
            </p>
          </div>
        );
      case "display":
        return (
          <div>
            <p>Size: {product?.product?.display.size}</p>
            <p>Resolution: {product?.product?.display.resolution}</p>
            <p>Type: {product?.product?.display.type}</p>
          </div>
        );
      case "processor":
        return (
          <div>
            <p>Type: {product?.product?.processor.type}</p>
            <p>Chipset: {product?.product?.processor.chipset}</p>
          </div>
        );
      case "memory":
        return (
          <div>
            <p>RAM: {product?.product?.memory.ram}</p>
            <p>Storage: {product?.product?.memory.storage}</p>
          </div>
        );
      case "rear_camera":
        return (
          <div>
            <p>Megapixels: {product?.product?.rear_camera.megapixels}</p>
            <p>Features: {product?.product?.rear_camera.features}</p>
          </div>
        );
      case "front_camera":
        return (
          <div>
            <p>Megapixels: {product?.product?.front_camera.megapixels}</p>
            <p>Features: {product?.product?.front_camera.features}</p>
          </div>
        );
      case "operating_system":
        return (
          <div>
            <p>Name: {product?.product?.operating_system.name}</p>
            <p>Version: {product?.product?.operating_system.version}</p>
          </div>
        );
      case "features":
        return (
          <div>
            <p>Sensors: {product?.product?.features.sensors}</p>
            <p>
              Waterproof: {product?.product?.features.waterproof ? "Yes" : "No"}
            </p>
          </div>
        );
      case "battery":
        return (
          <div>
            <p>Capacity: {product?.product?.battery.capacity}</p>
            <p>Type: {product?.product?.battery.type}</p>
            <p>
              Removable: {product?.product?.battery.removable ? "Yes" : "No"}
            </p>
          </div>
        );
      default:
        return <p>No data available for this section.</p>;
    }
  };

  return (
    <div className="my-8 dark:bg-gray-900 p-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Specification</h2>
      {sections.map((section, index) => (
        <div key={index} className="border-b">
          <button
            className="flex justify-between items-center w-full py-3 text-left"
            onClick={() => setOpenSection(openSection === index ? null : index)}
          >
            <span>{section.name}</span>
            <ChevronDown
              className={`transform transition-transform ${
                openSection === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === index && (
            <div className="py-2">{renderSectionContent(section)}</div>
          )}
        </div>
      ))}
    </div>
  );
};
