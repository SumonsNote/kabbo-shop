import NumberFlow from "@number-flow/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchCustomer({ setSearchQuery, searchQuery }) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></AiOutlineSearch>
          <input
            type="text"
            placeholder="Search customers by name or email..."
            className="pl-10 w-full bg-inherit rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
