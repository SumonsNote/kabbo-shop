import { PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { toast } from "react-toastify";
import SearchableDropdown from "../../components/ui/SearchableDropdown";

export const ProductDetails = ({ items, setValue }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [product, setProduct] = useState({
    model: "",
    color: "",
    variant: "",
    version: "",
    imei: "",
    warranty: "",
    quantity: 1,
    price: 0,
  });

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setValue("items", updatedItems);
  };

  // useEffect(() => {
  //   if (selectedVersion) {
  //     const price = selectedProduct?.find((obj) => {
  //       return obj.region.name == product.version;
  //     });

  //     setProduct({
  //       ...product,
  //       price:
  //         price?.discount_price !== 0 ? price?.discount_price : price?.price,
  //     });
  //   }
  // }, [selectedProduct, product.version]);
  const handleReset = () => {
    setProduct({
      model: "",
      color: "",
      variant: "",
      version: "",
      imei: "",
      warranty: "",
      quantity: 1,
      price: 0,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = () => {
    console.log(product);
    if (
      !product.model ||
      !product.color ||
      !product.variant ||
      !product.version ||
      !product.imei ||
      !product.warranty ||
      !product.quantity ||
      !product.price
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    setValue("items", [...items, product]);
    setProduct({
      model: "",
      color: "",
      variant: "",
      version: "",
      imei: "",
      warranty: "",
      quantity: 1,
      price: 0,
    });
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <ShoppingCartIcon className="w-5 h-5 text-blue-500" />
        Product Details
      </h2>

      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Product Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Model*
            </label>

            <SearchableDropdown
              value={product.model}
              onChange={setSelectedProduct}
              onBlur={() => console.log("Dropdown blurred")}
              placeholder="Search for an option"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              containerClassName=""
              optionClassName=" bg-gray-100 hover:bg-gray-200"
              optionActiveClassName="bg-primary-500 text-white"
              image={false}
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <select
              name="color"
              onChange={handleChange}
              value={product.color}
              className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            >
              <option value="">Select Color</option>
              {selectedProduct?.product.image?.map((obj) => (
                <option
                  key={obj.colors}
                  value={obj.colors}
                  className="capitalize"
                >
                  {obj.colors}
                </option>
              ))}
            </select>
          </div>

          {/* IMEI Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IMEI Number
            </label>
            <input
              type="text"
              name="imei"
              onChange={handleChange}
              value={product.imei}
              className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
              placeholder="Enter IMEI"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              onChange={handleChange}
              value={product.quantity}
              className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
              min="1"
            />
          </div>

          {/* Unit Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit Price
            </label>
            <input
              type="number"
              name="price"
              disabled
              onChange={handleChange}
              value={product.price}
              className="w-full rounded-lg border-gray-200 p-1.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 col-span-2 ">
            <button onClick={handleSubmit} type="button">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Product
              </div>
            </button>
            <button onClick={handleReset} type="button">
              <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                <IoReload className="w-4 h-4 mr-2" />
                Reset
              </div>
            </button>
          </div>
        </div>

        {/* Product Summary Table */}
        <div className="mt-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Model</th>
                <th className="text-left py-2">Color</th>
                <th className="text-center py-2">Variant</th>
                <th className="text-center py-2">Version</th>
                <th className="text-center py-2">IMEI Number</th>
                <th className="text-center py-2">Warranty Period</th>
                <th className="text-center py-2">Quantity</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
                <th className="text-center py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.model}</td>
                  <td className="py-2">{item.color}</td>
                  <td className="text-center">{item.variant}</td>
                  <td className="text-center">{item.version}</td>
                  <td className="text-center">{item.imei}</td>
                  <td className="text-center">{item.warranty}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">${item.price}</td>
                  <td className="text-right">${item.quantity * item.price}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="text-red-600 inline-flex gap-2 items-center hover:text-red-800"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <TrashIcon className="w-4 h-4" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
