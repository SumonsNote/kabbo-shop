"use client";
import Image from "next/image";
import React, { useState } from "react";
import Header from "./components/Header";
import NavSideBar from "./components/NavSideBar";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RootLayout = ({ children, params }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Provider store={store}>
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
              <Header
                setIsCollapsed={setIsCollapsed}
                isCollapsed={isCollapsed}
              />

              {/* Dashboard Content */}
              <div className="p-2 h-[93vh] overflow-x-auto flex justify-center items-start min-w-full relative">
                {children}
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
