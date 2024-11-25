import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import CodeEditor from "./RichTextEditor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const { register, handleSubmit, control, watch } = useForm();
  const router = useRouter();
  const codeRef = useRef();
  const onSubmit = async (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      toast.success("Product added successfully!");
      router.refresh();
      router.push("/dashboard/products");
    } else {
      toast.error("Error adding product");
    }
  };
  // Watch the value of "isNew"
  const isUsed = watch("isUsed");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-3 gap-4 w-full mx-auto "
    >
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
            <CodeEditor
              content={field.value}
              onChange={field.onChange}
              ref={codeRef}
            />
          )}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
