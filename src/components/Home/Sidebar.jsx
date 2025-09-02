import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv, UpdatedData = {}, setUpdatedData }) => {
  const [Data, setData] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    if (UpdatedData?.title || UpdatedData?.desc) {
      setData({ title: UpdatedData.title || "", desc: UpdatedData.desc || "" });
    }
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post(
        "https://task-backend-tan.vercel.app/api/v2/create-task",
        Data,
        { headers }
      );
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.put(
        `https://task-backend-tan.vercel.app/api/v2/update-task/${UpdatedData?.id}`,
        Data,
        { headers }
      );
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
      });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      {/* Overlay background */}
      <div
        className={`${InputDiv} top-0 left-0 h-screen w-full bg-black bg-opacity-70 fixed`}
      ></div>

      {/* Input Modal */}
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full fixed`}
      >
        <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3 bg-gray-900 p-6 rounded-lg shadow-lg">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="text-2xl text-white hover:text-red-400 transition-colors"
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  desc: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white text-base sm:text-lg"
            value={Data.title}
            onChange={change}
          />

          {/* Description Input */}
          <textarea
            name="desc"
            rows="5"
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white text-base sm:text-lg resize-none"
            value={Data.desc}
            onChange={change}
          />

          {/* Submit / Update Button */}
          {!UpdatedData?.id ? (
            <button
              className="w-full px-3 py-2 bg-blue-500 rounded text-white text-lg font-semibold hover:bg-blue-600 transition-colors"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="w-full px-3 py-2 bg-green-500 rounded text-white text-lg font-semibold hover:bg-green-600 transition-colors"
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
