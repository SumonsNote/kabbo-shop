"use client";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { formData } from "../autofill";
import AudioNetworkSection from "./AudioNetworkSection";
import BasicInfoSection from "./BasicInfoSection";
import BatteryPhysicalSection from "./BatteryPhysicalSection";
import CameraSection from "./CameraSection";
import DisplaySection from "./DisplaySection";
import ImagesWarrantySection from "./ImagesWarrantySection";
import MemorySection from "./MemorySection";
import OSFeaturesSection from "./OSFeaturesSection";
import ProcessorSection from "./ProcessorSection";
import StepBar from "./StepBar";

export default function AddProductForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "image",
  });
  const onSubmit = async (data) => {
    const res = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newData = await res.json();
    console.log(newData);
    if (res.ok) {
      console.log("Product added successfully!");
      toast.success("Product added successfully!");
      if (newData?.product?._id) {
        router.push(`/dashboard/products/${newData.product._id}`);
      }
    } else {
      console.error("Failed to add product");
      toast.error("Failed to add product");
    }
  };
  const handlePreview = () => {
    // console.log(formData);
  };

  const formSections = {
    1: {
      id: 1,
      title: "Basic Information",
      component: (
        <BasicInfoSection
          register={register}
          errors={errors}
          watch={watch}
          getValues={getValues}
        />
      ),
    },
    2: {
      id: 2,
      title: "Display",
      component: <DisplaySection register={register} errors={errors} />,
    },
    3: {
      id: 3,
      title: "Processor",
      component: <ProcessorSection register={register} errors={errors} />,
    },
    4: {
      id: 4,
      title: "Memory",
      component: <MemorySection register={register} errors={errors} />,
    },
    5: {
      id: 5,
      title: "Camera",
      component: <CameraSection register={register} errors={errors} />,
    },
    6: {
      id: 6,
      title: "Audio & Network",
      component: <AudioNetworkSection register={register} errors={errors} />,
    },
    7: {
      id: 7,
      title: "OS & Features",
      component: <OSFeaturesSection register={register} errors={errors} />,
    },
    8: {
      id: 8,
      title: "Battery & Physical",
      component: <BatteryPhysicalSection register={register} errors={errors} />,
    },
    9: {
      id: 9,
      title: "Images & Warranty",
      component: (
        <ImagesWarrantySection
          register={register}
          errors={errors}
          imageFields={imageFields}
          appendImage={appendImage}
          removeImage={removeImage}
          setValue={setValue}
        />
      ),
    },
  };

  const totalSteps = Object.keys(formSections).length;

  return (
    <div className="flex  gap-4">
      <div className=" p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-500">Add New Product</h2>
          <StepBar
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formSections={formSections}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {formSections[currentStep].component}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
              >
                Previous
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ml-auto"
              >
                Next
              </button>
            ) : (
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="px-4 py-2 bg-emerald-50 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 ml-auto"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      {/* <SpecificationPreview /> */}
    </div>
  );
}
