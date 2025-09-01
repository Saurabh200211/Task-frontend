import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const ImportantTasks = () => {
  const [Data, setData] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://task-backend-tan.vercel.app/api/v2/get-imp-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching important tasks:", error);
      }
    };

    fetch();
  }, []); // ✅ add dependency array to avoid infinite re-fetch

  return (
    <div className="w-full h-full p-2 sm:p-4 overflow-y-auto">
      <Cards home="false" data={Data} />
    </div>
  );
};

export default ImportantTasks;
