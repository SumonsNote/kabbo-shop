"use client";
import React, { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // FAQ Toggle State
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.subject) errors.subject = "Subject is required.";
    if (!formData.message) errors.message = "Message is required.";
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      setSuccessMessage(
        "Your message has been sent. We’ll get back to you shortly."
      );
      // Reset form fields
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  // Toggle FAQ answer visibility
  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Support</h1>

        {/* Support Form */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Submit a Support Request
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-4 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className={`w-full px-4 py-2 border ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`w-full px-4 py-2 border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "How do I reset my password?",
                answer:
                  "You can reset your password by clicking on 'Forgot Password' at the login screen.",
              },
              {
                question: "How do I update my account information?",
                answer:
                  "Go to the 'Account Settings' page to update your information.",
              },
              {
                question: "How do I contact support?",
                answer:
                  "You can contact support through this page or by emailing support@example.com.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left text-gray-800 font-medium focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`transform transition-transform ${
                      activeFAQ === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {activeFAQ === index && (
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Additional Contact Info */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Need More Help?
          </h2>
          <p className="text-gray-600">
            You can also reach us by phone or email:
          </p>
          <p className="mt-2 text-gray-800">
            <strong>Email:</strong> support@example.com
          </p>
          <p className="text-gray-800">
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p className="mt-4 text-gray-600">
            We’re here to help! Our support team is available Monday - Friday,
            9:00 AM - 5:00 PM (PST).
          </p>
        </section>
      </div>
    </div>
  );
}
