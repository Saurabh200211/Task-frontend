import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    history("/");
  }

  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.username === "" ||
        Data.email === "" ||
        Data.password === "" ||
        Data.country === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://task-backend-1wsa.vercel.app/api/v1/sign-in", // ✅ fixed to sign-in
          Data
        );
        setData({ username: "", email: "", password: "", country: "" });
        alert(response.data.message);
        history("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="p-6 sm:p-8 w-full sm:w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3 rounded-2xl bg-gray-800 shadow-lg">
        <div className="text-2xl font-semibold text-white text-center mb-6">
          Signup
        </div>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 mb-4 w-full rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="username"
          value={Data.username}
          onChange={change}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 px-3 py-2 mb-4 w-full rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="email"
          value={Data.email}
          onChange={change}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-2 mb-4 w-full rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="password"
          value={Data.password}
          onChange={change}
        />

        {/* Country */}
        <input
          type="text"
          placeholder="Country"
          className="bg-gray-700 px-3 py-2 mb-6 w-full rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="country"
          value={Data.country}
          onChange={change}
        />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            className="bg-blue-400 hover:bg-blue-500 font-semibold text-black px-4 py-2 w-full sm:w-auto rounded-lg transition"
            onClick={submit}
          >
            Sign Up
          </button>

          <Link
            to="/login"
            className="text-gray-400 hover:text-gray-200 text-sm sm:text-base"
          >
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
