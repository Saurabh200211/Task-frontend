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

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `https://task-backend-tan.vercel.app/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `https://task-backend-tan.vercel.app/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://task-backend-tan.vercel.app/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white break-words">
                {items.title}
              </h3>
              <p className="text-gray-300 my-2 text-sm sm:text-base break-words">
                {items.desc}
              </p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.complete === false
                    ? "bg-red-400"
                    : "bg-green-700"
                } p-2 rounded w-1/2 text-sm sm:text-base text-white`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Complete" : "Incomplete"}
              </button>
              <div className="text-white p-2 w-1/2 text-xl sm:text-2xl font-semibold flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>

                {home !== "false" && (
                  <button
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                  >
                    <FaEdit />
                  </button>
                )}
                <button>
                  <MdDelete onClick={() => deleteTask(items._id)} />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-md"
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircleSharp className="text-4xl sm:text-5xl" />
          <h2 className="text-lg sm:text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};
export default Cards;
