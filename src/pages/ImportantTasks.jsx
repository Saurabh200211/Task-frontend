import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const ImportantTasks = () => {
  const [Data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const API_URL = process.env.REACT_APP_API_URL; // ✅ use env variable

  useEffect(() => {
    const fetchImportantTasks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v2/get-imp-tasks`, // ✅ dynamic API URL
          { headers }
        );
        setData(response.data.data);
      } catch (err) {
        console.error(
          "Fetch important tasks error:",
          err.response?.data || err.message
        );
      }
    };

    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchImportantTasks();
    }
  }, []); // ✅ run once on mount

  return (
    <div className="p-2 sm:p-4">
      {Data ? (
        <Cards home={"false"} data={Data} />
      ) : (
        <p className="text-center text-gray-400 text-sm sm:text-base">
          No important tasks found.
        </p>
      )}
    </div>
  );
};

export default ImportantTasks;
