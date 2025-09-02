import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row h-[98vh] gap-4 p-2 sm:p-4">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 lg:w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between bg-gray-900 text-white">
        <Sidebar/>
      </div>

      {/* Main Content */}
      <div className="flex-1 border border-gray-500 rounded-xl p-4 overflow-y-auto bg-gray-950 text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
