"use client";
import { useFetchCustomersQuery } from "@/store/slices/customerApi";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import Loading from "../components/Loading";
import NoDataFound from "../components/NoDataFound";
import CustomerTable from "./_components/CustomerTable";
import SearchCustomer from "./_components/SearchCustomer";
import CustomerStats from "./_components/CustomerStats";

const CustomersAdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useFetchCustomersQuery();
  const customers = data?.customerProfiles ?? [];
  console.log(customers);
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.user.first_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      customer.user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-6  min-h-screen  text-gray-500">
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
      {/* Stats Section */}
      <CustomerStats customers={customers} />
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
