import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv, UpdatedData, setUpdatedData, fetchTasks }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  const API_URL = process.env.REACT_APP_API_URL; // ✅ use env base URL

  useEffect(() => {
    if (UpdatedData) {
      setData({
        title: UpdatedData.title || "",
        desc: UpdatedData.desc || "",
      });
    }
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"), // ✅ match backend
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    if (!e?.target?.name) return;
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setInputDiv("hidden");
    setData({ title: "", desc: "" });
    setUpdatedData({ id: "", title: "", desc: "" });
  };

  const submitData = async () => {
    if (!Data.title || !Data.desc) {
      alert("All fields are required");
      return;
    }
    try {
      await axios.post(
        `${API_URL}/api/v2/create-task`,
        { title: Data.title, desc: Data.desc }, // ✅ FIXED: use `desc`
        { headers }
      );

      closeModal();
      fetchTasks();
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      alert("Failed to create task. Please try again.");
    }
  };

  const UpdateTask = async () => {
    if (!Data.title || !Data.desc) {
      alert("All fields are required");
      return;
    }
    try {
      await axios.put(
        `${API_URL}/api/v2/update-task/${UpdatedData.id}`,
        { title: Data.title, desc: Data.desc }, // ✅ FIXED: use `desc`
        { headers }
      );

      closeModal();
      fetchTasks();
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <>
      <div className={`${InputDiv} top-0 left-0 h-screen w-full bg-gray-800 opacity-80 fixed`}></div>

      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full fixed`}>
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button className="text-2xl" onClick={closeModal}>
              <RxCross2 />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white"
            value={Data.title}
            onChange={change}
          />

          <textarea
            name="desc"
            rows="5"
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white"
            value={Data.desc}
            onChange={change}
          />

          {UpdatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400 hover:bg-blue-500 rounded text-black text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 hover:bg-blue-500 rounded text-black text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={UpdateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
