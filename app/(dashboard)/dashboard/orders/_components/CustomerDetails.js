import { UserIcon } from "lucide-react";

export const CustomerDetails = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
        <UserIcon className="w-5 h-5 text-blue-500" />
        Customer Details
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mobile field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number*
          </label>
          <input
            {...register("mobile", { required: true })}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            placeholder="+880 1XXX-XXXXXX"
          />
        </div>

        {/* Name field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name*
          </label>
          <input
            {...register("customer_name", { required: true })}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            placeholder="Enter customer name"
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            placeholder="customer@example.com"
          />
        </div>

        {/* Address field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Address*
          </label>
          <textarea
            {...register("address", { required: true })}
            className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            rows="2"
            placeholder="Enter delivery address"
          />
        </div>
      </div>
    </div>
  );
};
