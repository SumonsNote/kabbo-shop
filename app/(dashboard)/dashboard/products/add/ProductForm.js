"use client";

import { useForm } from "react-hook-form";
import CloudinaryUploader from "./ImageUpload";

export default function Component() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset(); // reset form after submission
  };

  return (
    <div className="container p-6 bg-white shadow-lg rounded-lg md:w-[40vw] lg:w-[60vw]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Model</label>
          <input
            {...register("model", { required: "Model is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Model Name"
          />
          {errors.model && (
            <p className="text-red-500 text-sm">{errors.model.message}</p>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">Display</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Display Size
            </label>
            <input
              {...register("display.size", {
                required: "Display size is required",
              })}
              placeholder="6.75 Inch"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.display?.size && (
              <p className="text-red-500 text-sm">
                {errors.display.size.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Type</label>
            <input
              {...register("display.type", {
                required: "Display type is required",
              })}
              placeholder="IPS LCD"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.display?.type && (
              <p className="text-red-500 text-sm">
                {errors.display.type.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Resolution
            </label>
            <input
              {...register("display.resolution", {
                required: "Resolution is required",
              })}
              placeholder="HD+ (720x1600 pixels)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.display?.resolution && (
              <p className="text-red-500 text-sm">
                {errors.display.resolution.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Refresh Rate
            </label>
            <input
              {...register("display.refreshRate", {
                required: "Refresh rate is required",
              })}
              placeholder="90Hz"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.display?.refreshRate && (
              <p className="text-red-500 text-sm">
                {errors.display.refreshRate.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Brightness
            </label>
            <input
              {...register("display.brightness", {
                required: "Brightness is required",
              })}
              placeholder="400 nits"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.display?.brightness && (
              <p className="text-red-500 text-sm">
                {errors.display.brightness.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Features</label>
            <input
              {...register("display.features", {
                required: "Features are required",
              })}
              placeholder="Display ratio: 20:9, Screen-to-body ratio: 90%, Contrast ratio: 1500: 1 (Typ.), Color gamut: NTSC NTSC 69.3% (Typ.)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.display?.features && (
              <p className="text-red-500 text-sm">
                {errors.display.features.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">Processor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Chipset</label>
            <input
              {...register("processor.chipset", {
                required: "Chipset is required",
              })}
              placeholder="MediaTek Helio G37"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.processor?.chipset && (
              <p className="text-red-500 text-sm">
                {errors.processor.chipset.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">CPU Type</label>
            <input
              {...register("processor.cpuType", {
                required: "CPU type is required",
              })}
              placeholder="Octa-core"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.processor?.cpuType && (
              <p className="text-red-500 text-sm">
                {errors.processor.cpuType.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">CPU Speed</label>
            <input
              {...register("processor.cpuSpeed", {
                required: "CPU speed is required",
              })}
              placeholder="2.0 GHz"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.processor?.cpuSpeed && (
              <p className="text-red-500 text-sm">
                {errors.processor.cpuSpeed.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">GPU</label>
            <input
              {...register("processor.gpu", { required: "GPU is required" })}
              placeholder="PowerVR GE8320"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.processor?.gpu && (
              <p className="text-red-500 text-sm">
                {errors.processor.gpu.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">Memory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">RAM</label>
            <input
              {...register("memory.ram", { required: "RAM is required" })}
              placeholder="6GB"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.memory?.ram && (
              <p className="text-red-500 text-sm">
                {errors.memory.ram.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Internal Storage
            </label>
            <input
              {...register("memory.internalStorage", {
                required: "Internal storage is required",
              })}
              placeholder="256GB eMMC 5.1"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.memory?.internalStorage && (
              <p className="text-red-500 text-sm">
                {errors.memory.internalStorage.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              External Storage
            </label>
            <input
              {...register("memory.externalStorage", {
                required: "External storage is required",
              })}
              placeholder="128GB eMMC 5.1"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.memory?.externalStorage && (
              <p className="text-red-500 text-sm">
                {errors.memory.externalStorage.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Rear Camera
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Resolution
            </label>
            <input
              {...register("rearCamera.resolution", {
                required: "Rear camera resolution is required",
              })}
              placeholder="50 MP, f/1.8, 26mm (wide), 1/2.55, 0.7µm, PDAF"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.rearCamera?.resolution && (
              <p className="text-red-500 text-sm">
                {errors.rearCamera.resolution.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Macro</label>
            <input
              {...register("rearCamera.macro", {
                required: "Macro camera details are required",
              })}
              placeholder="2 MP, f/2.4, (macro)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.rearCamera?.macro && (
              <p className="text-red-500 text-sm">
                {errors.rearCamera.macro.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Depth</label>
            <input
              {...register("rearCamera.depth", {
                required: "Depth camera details are required",
              })}
              placeholder="2 MP, f/2.4, (depth)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.rearCamera?.depth && (
              <p className="text-red-500 text-sm">
                {errors.rearCamera.depth.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Features</label>
            <input
              {...register("rearCamera.features", {
                required: "Camera features are required",
              })}
              placeholder="LED flash, HDR, Panorama, AI scene detection, Face detection"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.rearCamera?.features && (
              <p className="text-red-500 text-sm">
                {errors.rearCamera.features.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Video Recording
            </label>
            <input
              {...register("rearCamera.recording", {
                required: "Video recording details are required",
              })}
              placeholder="1080P @30FPS"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.rearCamera?.recording && (
              <p className="text-red-500 text-sm">
                {errors.rearCamera.recording.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Front Camera
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Resolution
            </label>
            <input
              {...register("frontCamera.resolution", {
                required: "Front camera resolution is required",
              })}
              placeholder="8 MP, f/2.0, 26mm (wide), 1/4, 1.12µm"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.frontCamera?.resolution && (
              <p className="text-red-500 text-sm">
                {errors.frontCamera.resolution.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Features</label>
            <input
              {...register("frontCamera.features", {
                required: "Front camera features are required",
              })}
              placeholder="HDR"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.frontCamera?.features && (
              <p className="text-red-500 text-sm">
                {errors.frontCamera.features.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Video Recording
            </label>
            <input
              {...register("frontCamera.recording", {
                required: "Video recording details are required",
              })}
              placeholder="1080P @30FPS"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.frontCamera?.recording && (
              <p className="text-red-500 text-sm">
                {errors.frontCamera.recording.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">Audio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Speaker</label>
            <input
              {...register("audio.speaker", {
                required: "Speaker details are required",
              })}
              placeholder="Dual Stereo Speaker"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.audio?.speaker && (
              <p className="text-red-500 text-sm">
                {errors.audio.speaker.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Audio Features
            </label>
            <input
              {...register("audio.features", {
                required: "Audio features are required",
              })}
              placeholder="Landscape Stereo Sound"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.audio?.features && (
              <p className="text-red-500 text-sm">
                {errors.audio.features.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Network & Connectivity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">SIM</label>
            <input
              {...register("network.sim", {
                required: "SIM details are required",
              })}
              placeholder="Dual SIM (1 Nano SIM + 1 Nano SIM) + 1 TF card (3-card slot) or Single SIM + 1 TF card"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.network?.sim && (
              <p className="text-red-500 text-sm">
                {errors.network.sim.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Network</label>
            <input
              {...register("network.network", {
                required: "Network details are required",
              })}
              placeholder="2G, 3G, 4G"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.network?.network && (
              <p className="text-red-500 text-sm">
                {errors.network.network.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Wi-Fi</label>
            <input
              {...register("network.wifi", {
                required: "Wi-Fi details are required",
              })}
              placeholder="Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.network?.wifi && (
              <p className="text-red-500 text-sm">
                {errors.network.wifi.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Bluetooth</label>
            <input
              {...register("network.bluetooth", {
                required: "Bluetooth details are required",
              })}
              placeholder="Bluetooth 5.1, A2DP, LE"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.network?.bluetooth && (
              <p className="text-red-500 text-sm">
                {errors.network.bluetooth.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">GPS</label>
            <input
              {...register("network.gps", {
                required: "GPS details are required",
              })}
              placeholder="GPS, GLONASS, GALILEO, BDS"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.network?.gps && (
              <p className="text-red-500 text-sm">
                {errors.network.gps.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">NFC</label>
            <select
              {...register("network.nfc", {
                required: "NFC details are required",
              })}
              placeholder="Yes"
              className="w-full p-2 h-10 border border-gray-300 rounded-md"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {errors.network?.nfc && (
              <p className="text-red-500 text-sm">
                {errors.network.nfc.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">USB</label>
            <input
              {...register("network.usb", {
                required: "USB details are required",
              })}
              placeholder="USB Type-C 2.0"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.network?.usb && (
              <p className="text-red-500 text-sm">
                {errors.network.usb.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Audio Jack
            </label>
            <input
              {...register("network.audioJack", {
                required: "Audio jack details are required",
              })}
              placeholder="3.5mm"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.network?.audioJack && (
              <p className="text-red-500 text-sm">
                {errors.network.audioJack.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">OS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Operating System
            </label>
            <input
              {...register("os.operatingSystem", {
                required: "Operating system is required",
              })}
              placeholder="Android 13"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.os?.operatingSystem && (
              <p className="text-red-500 text-sm">
                {errors.os.operatingSystem.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Custom UI</label>
            <input
              {...register("os.customUI", {
                required: "Custom UI details are required",
              })}
              placeholder="TCL UI 5.0"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.os?.customUI && (
              <p className="text-red-500 text-sm">
                {errors.os.customUI.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Fingerprint
            </label>
            <input
              {...register("features.fingerprint", {
                required: "Fingerprint details are required",
              })}
              placeholder="Side-Mounted"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.features?.fingerprint && (
              <p className="text-red-500 text-sm">
                {errors.features.fingerprint.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Sensors</label>
            <input
              {...register("features.sensors", {
                required: "Sensor details are required",
              })}
              placeholder="Accelerometer (G sensor), Proximity sensor, Light sensor"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.features?.sensors && (
              <p className="text-red-500 text-sm">
                {errors.features.sensors.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">Battery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Type</label>
            <input
              {...register("battery.type", {
                required: "Battery type is required",
              })}
              placeholder="Lithium-polymer 5010 mAh (non-removable)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.battery?.type && (
              <p className="text-red-500 text-sm">
                {errors.battery.type.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Fast Charging
            </label>
            <input
              {...register("battery.fastCharging", {
                required: "Fast charging details are required",
              })}
              placeholder="18W Wired"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.battery?.fastCharging && (
              <p className="text-red-500 text-sm">
                {errors.battery.fastCharging.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Physical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Dimension</label>
            <input
              {...register("physicalSpecifications.dimension", {
                required: "Dimension details are required",
              })}
              placeholder="167.9 x 76.5 x 8.5 mm (6.61 x 3.01 x 0.33 in)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.physicalSpecifications?.dimension && (
              <p className="text-red-500 text-sm">
                {errors.physicalSpecifications.dimension.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Weight</label>
            <input
              {...register("physicalSpecifications.weight", {
                required: "Weight is required",
              })}
              placeholder="190 g (6.70 oz)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.physicalSpecifications?.weight && (
              <p className="text-red-500 text-sm">
                {errors.physicalSpecifications.weight.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">
              Body Material
            </label>
            <input
              {...register("physicalSpecifications.bodyMaterial", {
                required: "Body material details are required",
              })}
              placeholder="Glass front, Plastic frame, Plastic back"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.physicalSpecifications?.bodyMaterial && (
              <p className="text-red-500 text-sm">
                {errors.physicalSpecifications.bodyMaterial.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Colors</label>
            <input
              {...register("physicalSpecifications.colors", {
                required: "Color options are required",
              })}
              placeholder="Twilight Purple, Dark Gray"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.physicalSpecifications?.colors && (
              <p className="text-red-500 text-sm">
                {errors.physicalSpecifications.colors.message}
              </p>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8">
          Warranty Information
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium">Warranty</label>
            <input
              {...register("warranty", {
                required: "Warranty information is required",
              })}
              placeholder="1 Year warranty (To claim please visit the nearest TCL service center)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.warranty && (
              <p className="text-red-500 text-sm">{errors.warranty.message}</p>
            )}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mt-8">Images</h3>
        <div className="grid-cols-2  gap-4">
          <CloudinaryUploader />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-6 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
