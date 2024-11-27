import { useAddProductMutation } from "@/store/slices/productApi";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { extractTableData } from "./extracTableData";
import ImageUpload from "./ImageUpload";
import AutofillButton from "./ProductAutofill";
import CodeEditor from "./RichTextEditor";
import { useFetchBrandsQuery } from "@/store/slices/brandApi";

export default function AddProductForm() {
  const { register, handleSubmit, control, watch, setValue, reset } = useForm();
  const { data } = useFetchBrandsQuery();
  console.log(data);
  const [addProduct, { isLoading, isError, isSuccess }] =
    useAddProductMutation();
  const router = useRouter();
  const codeRef = useRef();
  const onSubmit = async (data) => {
    const extractedData = extractTableData(codeRef.current.getContent());
    console.log({
      ...data,
      color: data.colors.split(","),
      specificationsHtml: codeRef.current.getContent(),
      specifications: extractedData,
    });
    addProduct({
      ...data,
      color: data.colors.split(","),
      specificationsHtml: codeRef.current.getContent(),
      specifications: extractedData,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added successfully!");
      router.refresh();
      router.push("/dashboard/products");
    }
    if (isError) {
      toast.error("Error adding product");
    }
    if (isLoading) {
      toast.info("Updating product...");
    }
  }, [isSuccess, isError, isLoading]);

  const handleTableData = () => {
    if (codeRef.current) {
      // Inserting code block into the editor
      codeRef.current.insertContent(
        `<!DOCTYPE html>
<html lang="en">
<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 10px;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Display</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px; width: 30%;">Size</td>
            <td style="padding: 8px;">6.1‑inch (diagonal)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Type</td>
            <td style="padding: 8px;">Super Retina XDR display<br>all‑screen OLED display</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Resolution</td>
            <td style="padding: 8px;">2556x1179-pixel resolution at 460 ppi</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Brightness</td>
            <td style="padding: 8px;">1,000 nits max brightness (typical)<br>1,600 nits peak brightness (HDR)<br>2,000 nits peak brightness (outdoor)<br>1 nit minimum brightness</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Protection</td>
            <td style="padding: 8px;">Ceramic Shield glass (2024 gen)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Features</td>
            <td style="padding: 8px;">Dynamic Island, HDR display, True Tone, Wide colour (P3), Haptic Touch, 2,000,000:1 contrast ratio, Fingerprint-resistant oleophobic coating, Support for display of multiple languages</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Processor</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Chipset</td>
            <td style="padding: 8px;">A18 chip</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">CPU Type</td>
            <td style="padding: 8px;">6‑core CPU with 2 performance and 4 efficiency cores<br>16‑core Neural Engine</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">GPU</td>
            <td style="padding: 8px;">5‑core GPU</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Memory</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Internal Storage</td>
            <td style="padding: 8px;">128GB NVMe</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Rear Camera</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Resolution</td>
            <td style="padding: 8px;">48MP Fusion: 26mm, ƒ/1.6 aperture<br>12MP 2x Telephoto: 52mm, ƒ/1.6 aperture<br>12MP Ultra Wide: 13mm, ƒ/2.2 aperture</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Features</td>
            <td style="padding: 8px;">Digital zoom, Camera Control, Sapphire crystal lens cover, True Tone flash, Photonic Engine, Deep Fusion, Smart HDR 5, Portrait modes, Night mode, Spatial photos, Macro photography</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Video Recording</td>
            <td style="padding: 8px;">4K Dolby Vision at 24/25/30/60 fps<br>Cinematic mode up to 4K HDR<br>Action mode up to 2.8K at 60 fps<br>Spatial video recording</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Front Camera</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Resolution</td>
            <td style="padding: 8px;">12MP camera</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Features</td>
            <td style="padding: 8px;">Autofocus, Retina Flash, Photonic Engine, Deep Fusion, Smart HDR 5, Portrait modes, Animoji and Memoji, Night mode</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Video Recording</td>
            <td style="padding: 8px;">4K Dolby Vision at 24/25/30/60 fps<br>Cinematic mode up to 4K<br>Slow-motion video</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Audio</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Speaker</td>
            <td style="padding: 8px;">Built‑in stereo speaker</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Audio Features</td>
            <td style="padding: 8px;">Supports AAC, APAC, MP3, Apple Lossless, FLAC, Dolby Digital, Dolby Atmos<br>Spatial Audio playback</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Network & Connectivity</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">SIM</td>
            <td style="padding: 8px;">Dual SIM (nano-SIM and eSIM)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Network</td>
            <td style="padding: 8px;">5G (sub‑6 GHz) with 4x4 MIMO<br>Gigabit LTE</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Wi-Fi</td>
            <td style="padding: 8px;">Wi‑Fi 7 (802.11be) with 2x2 MIMO<br>Ultra Wideband chip<br>Thread networking</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Bluetooth</td>
            <td style="padding: 8px;">Bluetooth 5.3</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">GPS</td>
            <td style="padding: 8px;">GPS, GLONASS, Galileo, QZSS, BeiDou<br>Digital compass<br>iBeacon microlocation</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">NFC</td>
            <td style="padding: 8px;">NFC with reader mode</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">USB</td>
            <td style="padding: 8px;">USB-C connector<br>Supports charging, DisplayPort, USB 2</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Operating System</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">OS</td>
            <td style="padding: 8px;">iOS 18</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Additional Features</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Sensors</td>
            <td style="padding: 8px;">Face ID, Barometer, High-g accelerometer, Proximity sensor, Dual ambient light sensors</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">IP Rating</td>
            <td style="padding: 8px;">IP68 (6 metres up to 30 minutes)</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Battery</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Type</td>
            <td style="padding: 8px;">Built-in rechargeable lithium-ion battery</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Fast Charging</td>
            <td style="padding: 8px;">MagSafe wireless up to 25W<br>Qi2 wireless up to 15W<br>Qi wireless up to 7.5W</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Physical Specifications</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Dimensions</td>
            <td style="padding: 8px;">147.6 x 71.6 x 7.8 mm</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Weight</td>
            <td style="padding: 8px;">170 g</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Body Material</td>
            <td style="padding: 8px;">Glass front and back, aluminum frame</td>
        </tr>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Colors</td>
            <td style="padding: 8px;">Black, White, Pink, Teal, Ultramarine</td>
        </tr>
    </tbody>

    <thead>
        <tr>
            <th colspan="2" style="background-color: #f2f2f2; padding: 10px; text-align: left; font-size: 16px;">Warranty</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 8px;">Warranty Details</td>
            <td style="padding: 8px;">BTRC Approved (One-year Apple warranty worldwide)</td>
        </tr>
    </tbody>
</table>
</body>
</html>`
      );
    }
  };
  // Watch the value of "isNew"
  const isUsed = watch("isUsed");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-3 gap-4 w-full mx-auto relative"
    >
      <AutofillButton setValue={setValue} />
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="iPhone 15 Pro Max 128GB Space Grey"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("name")}
        />
      </div>
      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Model
        </label>
        <input
          type="text"
          id="model"
          placeholder="iPhone 15 Pro Max"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("model")}
        />
      </div>
      <div>
        <label
          htmlFor="purchase_price"
          className="block text-sm font-medium text-gray-700"
        >
          Purchase Price
        </label>
        <input
          type="number"
          id="purchase_price"
          min={0}
          placeholder="1200"
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("purchase_price")}
        />
      </div>
      <div>
        <label
          htmlFor="original_price"
          className="block text-sm font-medium text-gray-700"
        >
          Original Price
        </label>
        <input
          type="number"
          min={0}
          id="original_price"
          step="0.01"
          placeholder="1200"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("original_price")}
        />
      </div>
      <div>
        <label
          htmlFor="discount_price"
          className="block text-sm font-medium text-gray-700"
        >
          Discount Price
        </label>
        <input
          min={0}
          type="number"
          step="0.01"
          id="discount_price"
          placeholder="1200"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("discount_price")}
        />
      </div>
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700"
        >
          Brand
        </label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("brand")}
        >
          {data?.brands.map(
            (brand) =>
              brand.title && (
                <option
                  key={brand.id}
                  value={brand.title}
                  className="capitalize"
                >
                  {brand.title}
                </option>
              )
          )}
        </select>
      </div>
      <div>
        <label
          htmlFor="storage"
          className="block text-sm font-medium text-gray-700"
        >
          Storage
        </label>

        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("storage")}
        >
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
          <option value="64GB">64GB</option>
          <option value="128GB">128GB</option>
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
          <option value="1TB">1TB</option>
          <option value="2TB">2TB</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="ram"
          className="block text-sm font-medium text-gray-700"
        >
          RAM
        </label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("ram")}
        >
          <option value="2GB">2GB</option>
          <option value="4GB">4GB</option>
          <option value="6GB">6GB</option>
          <option value="8GB">8GB</option>
          <option value="12GB">12GB</option>
          <option value="16GB">16GB</option>
          <option value="24GB">24GB</option>
          <option value="32GB">32GB</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="colors"
          className="block text-sm font-medium text-gray-700"
        >
          Colors
        </label>
        <input
          {...register("colors")}
          type="text"
          placeholder="Black, White, Red, Blue"
          id="colors"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-700"
        >
          Region
        </label>
        <input
          {...register("region")}
          type="text"
          placeholder="United States"
          id="region"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="isUsed"
          className="block text-sm font-medium text-gray-700"
        >
          Is Used
        </label>
        <select
          id="isUsed"
          defaultValue={false}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("isUsed")}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      {/* Conditionally render "Used Duration" based on "isNew" */}
      {isUsed === "true" && (
        <>
          <div>
            <label
              htmlFor="used-duration"
              className="block text-sm font-medium text-gray-700"
            >
              Used Duration
            </label>
            <input
              type="text"
              id="used-duration"
              placeholder="1-3 Months"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("usedDuration")}
            />
          </div>
          <div>
            <label
              htmlFor="batteryHealth"
              className="block text-sm font-medium text-gray-700"
            >
              Battery Health
            </label>
            <input
              {...register("batteryHealth")}
              id="batteryHealth"
              placeholder="85 - 89%"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="scratches"
              className="block text-sm font-medium text-gray-700"
            >
              Scratches
            </label>
            <select
              {...register("scratches")}
              id="scratches"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="No Scratches">No Scratches</option>
              <option value="Minor Scratches">Minor Scratches</option>
              <option value="Visible Scratches">Visible Scratches</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dents"
              className="block text-sm font-medium text-gray-700"
            >
              Dents
            </label>
            <select
              {...register("dents")}
              id="dents"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="No Dents">No Dents</option>
              <option value="Minor Dents">Minor Dents</option>
              <option value="Visible Dents">Visible Dents</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="accessoriesWithDevice"
              className="block text-sm font-medium text-gray-700"
            >
              Accessories With Device
            </label>
            <input
              {...register("accessoriesWithDevice")}
              id="accessoriesWithDevice"
              defaultValue="Charger, Earphones, SIM Ejector Tool"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="box"
              className="block text-sm font-medium text-gray-700"
            >
              Box
            </label>
            <select
              {...register("box")}
              id="box"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Without Box">Without Box</option>
              <option value="With Box">With Box</option>
            </select>
          </div>
        </>
      )}
      <div>
        <label
          htmlFor="simVariant"
          className="block text-sm font-medium text-gray-700"
        >
          SIM Variant
        </label>
        <select
          {...register("simVariant")}
          id="simVariant"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Single SIM">Single SIM</option>
          <option value="Dual SIM">Dual SIM</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="warrantyStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Warranty Status
        </label>
        <input
          {...register("warrantyStatus")}
          id="warrantyStatus"
          defaultValue="7 Days Replacement, 2 Years Service Warranty"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Stock
        </label>
        <input
          {...register("stock", { valueAsNumber: true })}
          id="stock"
          type="number"
          defaultValue={1}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-3">
        <label className="block text-sm font-medium text-gray-700">
          Images
        </label>
        <Controller
          name="images"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <ImageUpload onImagesChange={field.onChange} />
          )}
        />
      </div>
      <div className="col-span-3">
        <label
          htmlFor="short_description"
          className="block text-sm font-medium text-gray-700"
        >
          Short Description
        </label>
        <textarea
          {...register("short_description")}
          id="short_description"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-3">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          specifications
        </label>
        <Controller
          name="specificationsHtml"
          control={control}
          defaultValue=""
          render={({ field }) => (
            // <RichTextEditor content={field.value} onChange={field.onChange} />
            <CodeEditor content={field.value} ref={codeRef} />
          )}
        />
      </div>

      <div className="flex gap-4 col-span-2">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
        <button
          type="button"
          onClick={handleTableData}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Add Sample Table
        </button>
        <button
          type="button"
          onClick={reset}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={router.back}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
