// Function to automatically fill out the form
export const formData = {
  category_name: "Smartphone",
  brand_name: "apple",
  product_name: "Test Product XYZ",
  product_model: "Test Model XYZ",
  description: "Test Description ABC",
  display: {
    size: "6.75 Inch",
    type: "IPS LCD",
    resolution: "HD+ (720x1600 pixels)",
    refreshRate: "90Hz",
    brightness: "400 nits",
    features:
      "Display ratio: 20:9, Screen-to-body ratio: 90%, Contrast ratio: 1500:1 (Typ.), Color gamut: NTSC NTSC 69.3% (Typ.)",
  },
  processor: {
    chipset: "MediaTek Helio G37",
    cpuType: "Octa-core",
    cpuSpeed: "2.0 GHz",
    gpu: "PowerVR GE8320",
  },
  memory: {
    ram: "6GB",
    internalStorage: "256GB eMMC 5.1",
    externalStorage: "128GB eMMC 5.1",
  },

  rear_camera: {
    resolution: "50 MP, f/1.8, 26mm (wide), 1/2.55, 0.7µm, PDAF",
    macro: "2 MP, f/2.4, (macro)",
    depth: "2 MP, f/2.4, (depth)",
    features: "LED flash, HDR, Panorama, AI scene detection, Face detection",
    recording: "1080P @30FPS",
  },
  front_camera: {
    resolution: "8 MP, f/2.0, 26mm (wide), 1/4, 1.12µm",
    features: "HDR",
    recording: "1080P @30FPS",
  },

  audio: {
    speaker: "Dual Stereo Speaker",
    features: "Landscape Stereo Sound",
  },
  network_connectivity: {
    sim: "Dual SIM (1 Nano SIM + 1 Nano SIM) + 1 TF card (3-card slot) or Single SIM + 1 TF card",
    network: "2G, 3G, 4G",
    wifi: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    bluetooth: "Bluetooth 5.1, A2DP, LE",
    gps: "GPS, GLONASS, GALILEO, BDS",
    nfc: "Yes",
    usb: "USB Type-C 2.0",
    audioJack: "3.5mm",
  },
  operating_system: {
    operatingSystem: "Android 13",
    customUI: "TCL UI 5.0",
  },
  features: {
    fingerprint: "Side-Mounted",
    sensors: "Accelerometer (G sensor), Proximity sensor, Light sensor",
  },
  battery: {
    type: "Lithium-polymer 5010 mAh (non-removable)",
    fastCharging: "18W Wired",
  },
  physical_specification: {
    dimension: "167.9 x 76.5 x 8.5 mm (6.61 x 3.01 x 0.33 in)",
    weight: "190 g (6.70 oz)",
    bodyMaterial: "Glass front, Plastic frame, Plastic back",
    colors: "Twilight Purple, Dark Gray",
  },
  warranty_information:
    "1 Year warranty (To claim please visit the nearest TCL service center)",
};
// export function autofillForm() {
//   // Helper function to fill form fields
//   const fillField = (name, value) => {
//     const element = document.querySelector(`[name="${name}"]`);
//     if (element) {
//       element.value = value;
//     }
//   };

//   // Recursive function to handle nested objects
//   const fillNestedFields = (obj, prefix = "") => {
//     for (const [key, value] of Object.entries(obj)) {
//       const fieldName = prefix ? `${prefix}.${key}` : key;
//       if (typeof value === "object" && value !== null) {
//         fillNestedFields(value, fieldName);
//       } else {
//         fillField(fieldName, value);
//       }
//     }
//   };

//   // Fill all form fields
//   fillNestedFields(formData);

//   // Handle file input
//   const inputFile = document.querySelector('input[type="file"]');
//   if (inputFile) {
//     const dataTransfer = new DataTransfer();
//     dataTransfer.items.add(new File([""], "dummy-image.png"));
//     inputFile.files = dataTransfer.files;
//   }

//   console.log("Form has been auto-filled successfully");
// }

// Call the autofill function
// autofillForm();
export default function autofillValue(setValue) {
  // Helper function to fill form fields
  const fillField = (name, value) => {
    setValue(name, value);
  };

  // Recursive function to handle nested objects
  const fillNestedFields = (obj, prefix = "") => {
    for (const [key, value] of Object.entries(obj)) {
      const fieldName = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        fillNestedFields(value, fieldName);
      } else {
        fillField(fieldName, value);
      }
    }
  };

  // Fill all form fields
  fillNestedFields(formData);
}
