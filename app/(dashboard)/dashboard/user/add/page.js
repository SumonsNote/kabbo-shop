"use client";
import { useState } from "react";
import MyLottieAnimation from "../../components/LottieAnimation";
export default function AddUserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    status: "active",
    department: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-scree w-full h-full bg-gradient-to-bl from-blue-50 dark:to-gray-900 to-indigo-50 dark:from-indigo-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Illustration Section */}
          <div className="lg:w-1/2">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-indigo-900 mb-6">
                Welcome to the Team!
              </h1>
              <p className="text-lg text-indigo-700 mb-8">
                Add new members to your organization and help your team grow.
              </p>
            </div>

            {/* SVG Illustration */}
            <div className="hidden lg:block">
              <MyLottieAnimation />
            </div>
          </div>

          {/* Form Section */}

          <div className="lg:w-1/2 w-full space-y-6 user-form flex items-center">
            <div className="bg-white dark:bg-gray-900 dark:text-gray-500 rounded-2xl shadow-xl p-8 w-full">
              <h2 className="text-2xl font-bold text-gray-500 mb-6">
                Add New User
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="relative">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                    />
                  </div>

                  {/* Role */}
                  <div className="relative">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>

                  {/* Department */}
                  <div className="relative">
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                    >
                      <option value="">Select Department</option>
                      <option value="engineering">Engineering</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="hr">Human Resources</option>
                    </select>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    className="dark:bg-red-900 dark:text-gray-400 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white dark:text-gray-300 dark:bg-indigo-900 bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .user-form {
          display: flex;
          height: 80vh;
        }
        .user-form input,
        .user-form select {
          height: 2rem;
          background-color: inherit;
          border: 1px solid;
          padding-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}
