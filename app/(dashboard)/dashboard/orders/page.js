"use client";
import { useFetchOrdersQuery } from "@/store/slices/orderApi";
import { useEffect, useState } from "react";
import OrderFilterAndSearch from "./_components/Filter";
import OrderHeader from "./_components/Header";
import OrderStats from "./_components/Stats";
import Loading from "../components/Loading";
import OrderTable from "./_components/OrderTable";
import NoDataFound from "../components/NoDataFound";

const OrderDashboard = () => {
  const { data, isLoading, isError, error, isSuccess } = useFetchOrdersQuery();
  console.log(data);
  const { orders } = isSuccess && data;

  // States for search, filters, and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Filter orders
  const filteredOrders =
    orders?.filter((order) => {
      const matchesSearch =
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.userId.first_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchesPayment =
        paymentFilter === "All" || order.payment_info.status === paymentFilter;
      return matchesSearch && matchesStatus && matchesPayment;
    }) || [];

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="p-6 text-gray-500">
      {/* Header Section */}
      <OrderHeader />

      {/* Stats Cards */}
      <OrderStats orders={orders} />

      {/* Filters and Search Section */}
      <OrderFilterAndSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      {/* Orders Table */}
      {sortedOrders.length > 0 ? (
        <OrderTable
          orders={sortedOrders}
          sortConfig={sortConfig}
          handleSort={handleSort}
          sortedOrders={sortedOrders}
        />
      ) : (
        <NoDataFound title="Orders" />
      )}
    </div>
  );
};

export default OrderDashboard;
