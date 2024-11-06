"use client";
import React from "react";
import { useForm } from "react-hook-form";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset(); // reset form after submission
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Model</label>
          <input {...register("model", { required: "Model is required" })} />
          {errors.model && <p>{errors.model.message}</p>}
        </div>

        <h3>Display</h3>
        <div className="form-group">
          <label>Display Size</label>
          <input {...register("display.size")} placeholder="6.75 Inch" />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input {...register("display.type")} placeholder="IPS LCD" />
        </div>
        <div className="form-group">
          <label>Resolution</label>
          <input
            {...register("display.resolution")}
            placeholder="HD+ (720x1600 pixels) 260PPI"
          />
        </div>
        <div className="form-group">
          <label>Refresh Rate</label>
          <input {...register("display.refreshRate")} placeholder="90Hz" />
        </div>
        <div className="form-group">
          <label>Brightness</label>
          <input
            {...register("display.brightness")}
            placeholder="450 nits (Typ.)"
          />
        </div>

        <h3>Processor</h3>
        <div className="form-group">
          <label>Chipset</label>
          <input
            {...register("processor.chipset")}
            placeholder="MediaTek Helio G37 (12nm)"
          />
        </div>
        <div className="form-group">
          <label>CPU Type</label>
          <input {...register("processor.cpuType")} placeholder="Octa-core" />
        </div>
        <div className="form-group">
          <label>CPU Speed</label>
          <input
            {...register("processor.cpuSpeed")}
            placeholder="4 x Cortex-A53 @ 2.3GHz + 4 x Cortex-A53 @ 1.8GHz"
          />
        </div>
        <div className="form-group">
          <label>GPU</label>
          <input {...register("processor.gpu")} placeholder="PowerVR GE8320" />
        </div>

        <h3>Memory</h3>
        <div className="form-group">
          <label>RAM</label>
          <input {...register("memory.ram")} placeholder="6GB" />
        </div>
        <div className="form-group">
          <label>Internal Storage</label>
          <input
            {...register("memory.internalStorage")}
            placeholder="256GB eMMC 5.1"
          />
        </div>
        <div className="form-group">
          <label>Card Slot</label>
          <input
            {...register("memory.cardSlot")}
            placeholder="MicroSD card: up to 1TB"
          />
        </div>

        <h3>Camera</h3>
        <div className="form-group">
          <label>Rear Camera Resolution</label>
          <input
            {...register("camera.rearResolution")}
            placeholder="50 MP, f/1.8, 26mm (wide)"
          />
        </div>
        <div className="form-group">
          <label>Front Camera Resolution</label>
          <input
            {...register("camera.frontResolution")}
            placeholder="8 MP, f/2.0, 26mm (wide)"
          />
        </div>

        <h3>Battery</h3>
        <div className="form-group">
          <label>Type</label>
          <input
            {...register("battery.type")}
            placeholder="Lithium-polymer 5010 mAh (non-removable)"
          />
        </div>
        <div className="form-group">
          <label>Fast Charging</label>
          <input
            {...register("battery.fastCharging")}
            placeholder="18W Wired"
          />
        </div>

        <h3>Other Details</h3>
        <div className="form-group">
          <label>Operating System</label>
          <input {...register("os")} placeholder="Android 13" />
        </div>
        <div className="form-group">
          <label>Color</label>
          <input {...register("color")} placeholder="Twilight Purple" />
        </div>
        <div className="form-group">
          <label>Weight</label>
          <input {...register("weight")} placeholder="190 g (6.70 oz)" />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
