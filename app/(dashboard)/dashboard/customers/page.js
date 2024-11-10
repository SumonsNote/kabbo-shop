"use client";
import { useFetchCustomersQuery } from "@/store/slices/customerApi";
import { useFetchProductsQuery } from "@/store/slices/productApi";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import SearchCustomer from "./_components/SearchCustomer";
import CustomerTable from "./_components/Customertable";
import NotFound from "../not-found";
import NoDataFound from "../components/NoDataFound";
import { AiOutlinePlus, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";

const CustomersAdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useFetchCustomersQuery();
  const customers = data?.customerProfiles ?? [];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.userId.first_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      customer.userId.last_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-6  min-h-screen w-full text-gray-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold ">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your customer base
          </p>
        </div>
        <button className="inline-flex gap-2 items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          <AiOutlineUserAdd />
          Add Customer
        </button>
      </div>

      {/* Search and Stats Cards */}
      <SearchCustomer
        customers={customers}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (
        <NoDataFound title="Customers" />
      ) : (
        <CustomerTable filteredCustomers={filteredCustomers} />
      )}
    </div>
  );
};

export default CustomersAdminPanel;
