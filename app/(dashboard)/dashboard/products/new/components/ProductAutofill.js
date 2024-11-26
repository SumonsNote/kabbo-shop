import React from "react";

const AutofillButton = ({ setValue }) => {
  const handleAutofill = () => {
    // Sample product data
    const sampleProduct = {
      // Basic Product Info
      name: "iPhone 14 Pro 256GB Graphite",
      model: "iPhone 14 Pro",
      price: 1099,
      brand: "Apple",
      storage: "256GB",
      ram: "6GB",
      colors: "Graphite, Silver, Gold, Deep Purple",
      region: "United States",

      // Used Product Details
      isUsed: "true",
      usedDuration: "6-12 Months",
      batteryHealth: "88%",
      scratches: "Minor Scratches",
      dents: "No Dents",
      accessoriesWithDevice: "Charger, Original Earphones, SIM Ejector Tool",
      box: "With Box",

      // Additional Details
      simVariant: "Dual SIM",
      warrantyStatus: "6 Months Manufacturer Warranty",
      stock: 5,

      // Descriptive Fields
      short_description:
        "Excellent condition iPhone 14 Pro with powerful A16 Bionic chip and professional camera system. Barely used and well-maintained.",

      specifications: `
<h3>Key Specifications</h3>
<ul>
  <li><strong>Processor:</strong> A16 Bionic Chip</li>
  <li><strong>Display:</strong> 6.1-inch Super Retina XDR OLED</li>
  <li><strong>Resolution:</strong> 2556 x 1179 pixels</li>
  <li><strong>Rear Camera:</strong> 48MP Main, 12MP Ultra Wide, 12MP Telephoto</li>
  <li><strong>Front Camera:</strong> 12MP TrueDepth</li>
  <li><strong>Battery:</strong> 3200 mAh with MagSafe Wireless Charging</li>
</ul>
      `,

      // Placeholder for images (would typically be handled by ImageUpload component)
      images: [],
    };

    // Dynamically set all values
    Object.entries(sampleProduct).forEach(([key, value]) => {
      setValue(key, value);
    });
  };

  return (
    <button
      type="button"
      onClick={handleAutofill}
      className="absolute -top-20 w-36 right-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Autofill Product
    </button>
  );
};

export default AutofillButton;
