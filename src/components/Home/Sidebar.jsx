import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const navLinks = [
    { title: "All tasks", icon: <CgNotes />, link: "/" },
    { title: "Important tasks", icon: <MdLabelImportant />, link: "/importantTasks" },
    { title: "Completed tasks", icon: <FaCheckDouble />, link: "/completedTasks" },
    { title: "Incompleted tasks", icon: <TbNotebookOff />, link: "/incompletedTasks" },
  ];

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    history("/signup");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/me`, { headers });
        console.log("User API Response:", response.data);

        // ✅ safely set Data based on API format
        if (response.data?.user) {
          setData(response.data.user);
        } else {
          setData(response.data || {});
        }
      } catch (err) {
        console.error("Sidebar fetch error:", err.response?.data || err.message);
      }
    };

    if (headers.id && headers.authorization) {
      fetchUser();
    }
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-between items-center p-3 bg-gray-800 text-white">
        <h1 className="font-bold text-lg">Task Manager</h1>
        <button
          className="p-2 bg-gray-700 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-64`}
      >
        {Data && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{Data.username}</h2>
            <h4 className="my-1 text-gray-400">{Data.email}</h4>
            <p className="text-gray-500 text-sm">Total tasks: {Data.tasks?.length || 0}</p>
            <hr className="border-gray-600 mt-2" />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          {navLinks.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.icon} {item.title}
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <button
            className="bg-red-600 w-full p-2 rounded hover:bg-red-500 transition"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;