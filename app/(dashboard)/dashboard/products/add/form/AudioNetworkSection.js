import React from "react";

export default function Audionetwork_connectivitySection({ register, errors }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">Audio</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Speaker</label>
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
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">
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

      <h3 className="text-2xl font-semibold text-gray-400 mb-4 mt-8">
        Network & Connectivity
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">SIM</label>
          <input
            {...register("network_connectivity.sim", {
              required: "SIM details are required",
            })}
            placeholder="Dual SIM (1 Nano SIM + 1 Nano SIM) + 1 TF card (3-card slot) or Single SIM + 1 TF card"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.network_connectivity?.sim && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.sim.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Network</label>
          <input
            {...register("network_connectivity.network", {
              required: "network details are required",
            })}
            placeholder="2G, 3G, 4G"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.network_connectivity?.network && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.network.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Wi-Fi</label>
          <input
            {...register("network_connectivity.wifi", {
              required: "Wi-Fi details are required",
            })}
            placeholder="Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.network_connectivity?.wifi && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.wifi.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Bluetooth</label>
          <input
            {...register("network_connectivity.bluetooth", {
              required: "Bluetooth details are required",
            })}
            placeholder="Bluetooth 5.1, A2DP, LE"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.network_connectivity?.bluetooth && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.bluetooth.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">GPS</label>
          <input
            {...register("network_connectivity.gps", {
              required: "GPS details are required",
            })}
            placeholder="GPS, GLONASS, GALILEO, BDS"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.network_connectivity?.gps && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.gps.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">NFC</label>
          <select
            {...register("network_connectivity.nfc", {
              required: "NFC details are required",
            })}
            placeholder="Yes"
            className="w-full p-2 h-10 border border-gray-300 rounded-md"
          >
            <option value="true">No</option>
            <option value="Yes">Yes</option>
          </select>
          {errors.network_connectivity?.nfc && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.nfc.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">USB</label>
          <input
            {...register("network_connectivity.usb", {
              required: "USB details are required",
            })}
            placeholder="USB Type-C 2.0"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.network_connectivity?.usb && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.usb.message}
            </p>
          )}
        </div>
        <div className="form-group text-gray-500">
          <label className="block text-gray-500 font-medium">Audio Jack</label>
          <input
            {...register("network_connectivity.audioJack", {
              required: "Audio jack details are required",
            })}
            placeholder="3.5mm"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.network_connectivity?.audioJack && (
            <p className="text-red-500 text-sm">
              {errors.network_connectivity.audioJack.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
