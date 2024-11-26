import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import CodeEditor from "./RichTextEditor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AutofillButton from "./ProductAutofill";
import { useAddProductMutation } from "@/store/slices/productApi";
import { useEffect } from "react";
import {
  extractTableData,
  extractTableDataFromSimpleTable,
} from "./extracTableData";

export default function AddProductForm() {
  const { register, handleSubmit, control, watch, setValue, reset } = useForm();
  const [addProduct, { isLoading, isError, isSuccess }] =
    useAddProductMutation();
  const router = useRouter();
  const codeRef = useRef();
  const onSubmit = async (data) => {
    const extractedData = extractTableData(codeRef.current.getContent());
    const extractedData2 = extractTableDataFromSimpleTable(
      codeRef.current.getContent()
    );
    console.log("demo", extractedData);
    console.log("demo2", extractedData2);
    addProduct({
      ...data,
      color: data.colors.split(","),
      specifications: codeRef.current.getContent(),
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
        `<table border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Size</td>
                <td>6.67 inches</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>IPS LCD</td>
              </tr>
              <tr>
                <td>Resolution</td>
                <td>720 x 1600 pixels</td>
              </tr>
              <tr>
                <td>Refresh Rate</td>
                <td>120Hz</td>
              </tr>
              <tr>
                <td>Protection</td>
                <td>Gorilla Glass</td>
              </tr>
            </tbody>
          </table>`
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
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          placeholder="1200"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register("price")}
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
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Google">Google</option>
          <option value="OnePlus">OnePlus</option>
          <option value="Xiaomi">Xiaomi</option>
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
          name="specifications"
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
