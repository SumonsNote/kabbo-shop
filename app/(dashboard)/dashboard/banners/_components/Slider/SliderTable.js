import Image from "next/image";

const TableComponent = ({ sliders }) => {
  if (!sliders || sliders.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No sliders found.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8 dark:bg-gray-900 dark:text-gray-300">
      {/* Title Section */}
      <div className="bg-blue-500 text-white w-full flex justify-center items-center dark:bg-blue-700">
        {/* You can add a title or other content here */}
      </div>

      {/* Table Section with Scroll */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
          </table>

          {/* Table Body with Scroll */}
          <div className="overflow-y-auto max-h-96">
            <table className="w-full table-auto">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sliders.map((slider) => (
                  <tr
                    key={slider.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      {slider.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {slider.description}
                    </td>
                    <td className="px-8 py-3">
                      <Image
                        src={slider.image}
                        width={200}
                        height={200}
                        alt={slider.title}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                      {slider.regular_price}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
