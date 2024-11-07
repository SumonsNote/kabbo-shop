"use client";
import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import BrandForm from "../components/brand/BrandForm";
import SingeBrand from "../components/brand/SingeBrand";
import Error from "../components/Error";
import Loading from "../components/Loading";
import NoDataFound from "../components/NoDataFound";
import RelativeModal from "../components/RelativeModal";

const CategoryAdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  // useEffect(() => {
  //   async function fetchCategories() {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("/api/product/category");
  //       const data = await response.json();
  //       setCategories(data?.categories);
  //       setError(null);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchCategories();
  // }, []);

  const filteredCategories = categories?.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="m-auto w-full h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  if (filteredCategories.length === 0) {
    return <NoDataFound title="Categories" />;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={toggleModal}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <AiOutlinePlus className="w-4 h-4 mr-2" />
          Add Category
        </button>
        {isOpen && (
          <RelativeModal setShowForm={toggleModal} title={"Add Category"}>
            <BrandForm />
          </RelativeModal>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="relative">
            <AiOutlineSearch className="absolute top-3 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Category List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.map((category, i) => (
                <SingeBrand key={category.id} brand={category} i={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdminPanel;
