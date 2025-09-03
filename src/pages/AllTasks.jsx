import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v2/get-all-tasks`, {
        headers,
      });
      setData(response.data.data);
    } catch (err) {
      console.error("Fetch tasks error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetchTasks();
    }
  }, []);

  return (
    <>
      <div className="w-full">
        {/* ✅ Add Task button */}
        <div className="w-full flex justify-end px-3 sm:px-6 py-2 sm:py-4">
          <button
            onClick={() => setInputDiv("fixed")}
            className="flex items-center gap-2 bg-gray-800 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            <IoAddCircleSharp className="text-2xl sm:text-3xl" />
            <span className="hidden sm:inline text-sm sm:text-base font-medium">
              Add Task
            </span>
          </button>
        </div>

        {/* ✅ Task Cards */}
        {Data && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={Data.tasks || Data}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>

      {/* ✅ Input Modal */}
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
        fetchTasks={fetchTasks}
      />
    </>
  );
};

export default AllTasks;
