import React, { useState } from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row h-[98vh] gap-4">
      {/* ✅ Sidebar for Desktop & Tablet */}
      <div className="hidden sm:flex w-1/6 border border-gray-500 rounded-xl p-4 flex-col justify-between">
        <Sidebar />
      </div>

      {/* ✅ Mobile Sidebar (Toggle Button) */}
      <div className="sm:hidden flex items-center justify-between px-4 py-2 border-b border-gray-600">
        <h1 className="text-lg font-semibold text-gray-200">Task Manager</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <HiX className="text-2xl text-gray-200" />
          ) : (
            <HiMenuAlt3 className="text-2xl text-gray-200" />
          )}
        </button>
      </div>

      {/* ✅ Sidebar Drawer (Mobile) */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-60 z-40">
          <div className="absolute left-0 top-0 w-64 h-full bg-gray-900 border-r border-gray-600 p-4 flex flex-col justify-between z-50">
            <Sidebar />
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Main Content Area */}
      <div className="flex-1 sm:w-5/6 border border-gray-500 rounded-xl p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
