"use client";
import Image from "next/image";
import React, { useState } from "react";
import Header from "./components/Header";
import NavSideBar from "./components/NavSideBar";

const RootLayout = ({ children, params }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen relative">
          {/* Sidebar */}
          <NavSideBar
            params={params}
            setIsCollapsed={setIsCollapsed}
            isCollapsed={isCollapsed}
          />

          {/* Main Content */}
          <div className="flex-1 relative overflow-hidden">
            {/* Header */}
            <Header setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />

            {/* Dashboard Content */}
            <div className="p-2 h-[93vh] overflow-x-auto flex justify-center items-start min-w-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
