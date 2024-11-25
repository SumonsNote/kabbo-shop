"use client";

import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";

import { useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import NavSideBar from "./components/NavSideBar";

const DashboardLayout = ({ children, params }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <ToastContainer />
      <SessionProvider>
        <Provider store={store}>
          <div className="flex h-screen relative">
            {/* Sidebar */}
            <NavSideBar
              params={params}
              setIsCollapsed={setIsCollapsed}
              isCollapsed={isCollapsed}
            />

            {/* Main Content */}
            <div className="flex-1 relative overflow-hidden ">
              {/* Header */}
              <Header
                setIsCollapsed={setIsCollapsed}
                isCollapsed={isCollapsed}
              />

              {/* Dashboard Content */}
              <div className="p-2 h-[93vh]  dark:bg-gray-950/95 mainContainer overflow-x-auto flex justify-center items-start min-w-full relative">
                {children}
              </div>
            </div>
          </div>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default DashboardLayout;
