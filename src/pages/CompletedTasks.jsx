import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompletedTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://task-backend-tan.vercel.app/api/v2/get-complete-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };
    fetch();
  }, []); // ✅ runs only once on mount

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white px-4 sm:px-6 lg:px-12 py-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
        ✅ Completed Tasks
      </h2>

      {Data && Data.length > 0 ? (
        <Cards home={"false"} data={Data} />
      ) : (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No completed tasks yet 🎉
        </p>
      )}
    </div>
  );
};

export default CompletedTasks;
