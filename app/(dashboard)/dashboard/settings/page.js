"use client";
import React, { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [accountSettings, setAccountSettings] = useState({
    username: "john_doe",
    email: "john.doe@example.com",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validation and handling functions
  const validateForm = () => {
    const errors = {};
    if (!accountSettings.username) errors.username = "Username is required.";
    if (!accountSettings.email) errors.email = "Email is required.";
    if (password.new && password.new !== password.confirm)
      errors.password = "Passwords do not match.";
    return errors;
  };

  const handleSaveChanges = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      // Assume a successful save to the server here
      setErrors({});
      setSuccessMessage("Settings updated successfully.");
      // Clear sensitive fields like password
      setPassword({ current: "", new: "", confirm: "" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>

        {/* Account Settings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                value={accountSettings.username}
                onChange={(e) =>
                  setAccountSettings({
                    ...accountSettings,
                    username: e.target.value,
                  })
                }
                className={`w-full px-4 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={accountSettings.email}
                onChange={(e) =>
                  setAccountSettings({
                    ...accountSettings,
                    email: e.target.value,
                  })
                }
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <button
              onClick={handleSaveChanges}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
        </section>

        {/* Password Change */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Change Password
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                value={password.new}
                onChange={(e) =>
                  setPassword({ ...password, new: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Confirm New Password
              </label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <button
              onClick={handleSaveChanges}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Password
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Notifications
          </h2>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">
              Receive notifications
            </label>
            <div className="relative">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
              <span
                className={`w-5 h-5 absolute top-0.5 left-1 bg-white border rounded-full transition-transform transform peer-checked:translate-x-full`}
              ></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
