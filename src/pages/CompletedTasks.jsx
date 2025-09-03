import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompletedTasks = () => {
  const [Data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v2/get-complete-tasks`,
          { headers }
        );
        setData(response.data.data);
      } catch (err) {
        console.error(
          "Fetch completed tasks error:",
          err.response?.data || err.message
        );
      }
    };

    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchCompletedTasks();
    }
  }, []);

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4">
      {/* ✅ Page Heading */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-200 mb-4 text-center sm:text-left">
        Completed Tasks
      </h2>

      {/* ✅ Cards Grid (responsive inside Cards.jsx) */}
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default CompletedTasks;
