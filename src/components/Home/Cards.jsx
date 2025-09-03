import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`${API_URL}/api/v2/update-complete-task/${id}`, {}, { headers });
    } catch (error) {
      console.error("Error completing task:", error.response?.data || error.message);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/api/v2/update-imp-task/${id}`, {}, { headers });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error marking task important:", error.response?.data || error.message);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id, title, desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/v2/delete-task/${id}`, { headers });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          data.map((items, i) => (
            <div
              key={items._id || i}
              className="flex flex-col justify-between bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{items.title}</h3>
                <p className="text-gray-300 my-2 text-sm sm:text-base">{items.desc}</p>
              </div>
              <div className="mt-4 w-full flex flex-col sm:flex-row sm:items-center gap-2">
                <button
                  className={`${
                    items.complete === false ? "bg-red-400" : "bg-green-700"
                  } p-2 rounded w-full sm:w-1/2 text-sm sm:text-base`}
                  onClick={() => handleCompleteTask(items._id)}
                >
                  {items.complete === true ? "Complete" : "In Complete"}
                </button>

                <div className="text-white p-2 w-full sm:w-1/2 text-xl sm:text-2xl font-semibold flex justify-around">
                  <button onClick={() => handleImportant(items._id)}>
                    {items.important === false ? (
                      <CiHeart />
                    ) : (
                      <FaHeart className="text-red-500" />
                    )}
                  </button>

                  {home !== "false" && (
                    <button onClick={() => handleUpdate(items._id, items.title, items.desc)}>
                      <FaEdit />
                    </button>
                  )}

                  <button onClick={() => deleteTask(items._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {home === "true" && (
          <button
            className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-6 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow"
            onClick={() => setInputDiv("fixed")}
          >
            <IoAddCircleSharp className="text-4xl sm:text-5xl" />
            <h2 className="text-lg sm:text-2xl mt-4">Add Task</h2>
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
