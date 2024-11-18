import Image from "next/image";
import { useEffect, useState } from "react";

const OfferTable = ({ offers }) => {
  const [countdown, setCountdown] = useState({});

  // Calculate remaining time for countdown
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const timeDifference = new Date(targetDate) - now;

    if (timeDifference <= 0) {
      return "Offer Expired";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const countdowns = offers.reduce((acc, item) => {
      // Set the countdown for each offer by ID
      acc[item._id.$oid] = calculateTimeLeft(item.countdown.date);
      return acc;
    }, {});

    setCountdown(countdowns);

    // Update the countdown every second
    const intervalId = setInterval(() => {
      const newCountdowns = offers.reduce((acc, item) => {
        acc[item._id.$oid] = calculateTimeLeft(item.countdown.date);
        return acc;
      }, {});

      setCountdown(newCountdowns);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [offers]);

  if (!offers || offers.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No offers found.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {offers.map((item) => (
        <div
          key={item._id.$oid}
          className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Countdown Section */}
          <div className="bg-gray-50 flex justify-between dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Countdown: {item.countdown.short_description}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expiring in: {countdown[item._id.$oid] || "Calculating..."}
              </p>
            </div>
            <div>
              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 space-x-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md dark:bg-red-700 dark:hover:bg-red-600">
                  Delete
                </button>
              </td>
            </div>
          </div>

          {/* Offer Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Brand
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Regular Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Discount Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Main Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sub Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {item.offer.map((offer) => (
                  <tr
                    key={offer._id.$oid}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      {offer.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {offer.brand}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      ${offer.regular_price}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      ${offer.discount_price}
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={offer.main_img}
                        alt={offer.title}
                        width={500}
                        height={500}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-h-24 overflow-x-auto flex flex-wrap gap-1">
                        {offer.sub_img.map((img, index) => (
                          <Image
                            key={index}
                            src={img}
                            alt={offer.title}
                            width={500}
                            height={500}
                            className="h-8 w-16 object-cover rounded-md m-1 dark:border dark:border-white"
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md dark:bg-blue-700 dark:hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md dark:bg-red-700 dark:hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferTable;
