import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv, UpdatedData, setUpdatedData, fetchTasks }) => {
  // always have a safe data shape
  const [Data, setData] = useState({ title: "", desc: "" });
  const API_URL = process.env.REACT_APP_API_URL;

  // make a safe copy so we never read .id from undefined
  const safeUpdated = UpdatedData || { id: "", title: "", desc: "" };

  useEffect(() => {
    // fill inputs when UpdatedData changes
    setData({
      title: safeUpdated.title || "",
      desc: safeUpdated.desc || "",
    });
  }, [safeUpdated]);

  const headers = {
    id: localStorage.getItem("id"),
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
    setUpdatedData?.({ id: "", title: "", desc: "" });
  };

  const submitData = async () => {
    if (!Data.title || !Data.desc) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/v2/create-task`,
        { title: Data.title, desc: Data.desc },
        { headers }
      );

      // optionally check server response for success flag
      if (response?.data?.success === false) {
        const msg = response?.data?.message || "Failed to create task";
        alert(msg);
        return;
      }

      closeModal();
      fetchTasks?.();
    } catch (err) {
      // show a specific message if server provides it
      const serverMsg =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : null) ||
        err?.message ||
        "Failed to create task. Please try again.";
      console.error("API Error (create):", err?.response?.data || err?.message || err);
      alert(serverMsg);
    }
  };

  const UpdateTask = async () => {
    if (!Data.title || !Data.desc) {
      alert("All fields are required");
      return;
    }

    if (!safeUpdated.id) {
      alert("No task selected to update.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/v2/update-task/${safeUpdated.id}`,
        { title: Data.title, desc: Data.desc },
        { headers }
      );

      if (response?.data?.success === false) {
        const msg = response?.data?.message || "Failed to update task";
        alert(msg);
        return;
      }

      closeModal();
      fetchTasks?.();
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : null) ||
        err?.message ||
        "Failed to update task. Please try again.";
      console.error("API Error (update):", err?.response?.data || err?.message || err);
      alert(serverMsg);
    }
  };

  return (
    <>
      {/* overlay - click to close */}
      <div
        onClick={closeModal}
        className={`${InputDiv} top-0 left-0 h-screen w-full bg-gray-800 opacity-80 fixed`}
      />

      {/* modal */}
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full fixed`}
        aria-hidden={InputDiv === "hidden"}
      >
        <div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/6 bg-gray-900 p-4 rounded shadow-lg">
          <div className="flex justify-end">
            <button
              type="button"
              aria-label="Close"
              className="text-2xl text-white"
              onClick={closeModal}
            >
              <RxCross2 />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={Data.title}
            onChange={change}
          />

          <textarea
            name="desc"
            rows="5"
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={Data.desc}
            onChange={change}
          />

          {!safeUpdated.id ? (
            <button
              type="button"
              className="px-3 py-2 bg-blue-400 hover:bg-blue-500 rounded w-full text-black text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="px-3 py-2 bg-blue-400 hover:bg-blue-500 rounded w-full text-black text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
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
