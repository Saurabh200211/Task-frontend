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

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://task-backend-tan.vercel.app/api/v2/get-all-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []); // ✅ runs only once when component mounts

  return (
    <>
      <div className="w-full min-h-screen bg-gray-950 text-white">
        {/* Top Add Button */}
        <div className="w-full flex justify-end p-4">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>

        {/* Tasks */}
        <div className="px-4 sm:px-6 lg:px-12">
          {Data ? (
            <Cards
              home={"true"}
              setInputDiv={setInputDiv}
              data={Data.tasks}
              setUpdatedData={setUpdatedData}
            />
          ) : (
            <p className="text-center text-gray-400 mt-10 text-lg">
              No tasks found. Click + to add one!
            </p>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
};

export default AllTasks;
