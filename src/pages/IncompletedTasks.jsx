import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const IncompletedTasks = () => {
  const [Data, setData] = useState();
  const API_URL = process.env.REACT_APP_API_URL;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v2/get-incomplete-tasks`,
          { headers }
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
      }
    };

    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchTasks();
    }
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-2 sm:p-4 lg:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Incomplete Tasks
      </h1>

      {Data && Data.length > 0 ? (
        <Cards home="false" data={Data} />
      ) : (
        <p className="text-center text-gray-400 text-sm sm:text-base">
          No incomplete tasks available.
        </p>
      )}
    </div>
  );
};

export default IncompletedTasks;
