import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const IncompletedTasks = () => {
  const [Data, setData] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://task-backend-tan.vercel.app/api/v2/get-incomplete-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching incomplete tasks:", error);
      }
    };

    fetch();
  }, []); // ✅ runs only once on mount

  return (
    <div className="w-full h-full p-2 sm:p-4 overflow-y-auto">
      <Cards home="false" data={Data} />
    </div>
  );
};

export default IncompletedTasks;
