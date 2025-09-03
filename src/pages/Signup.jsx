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

  const API_URL = process.env.REACT_APP_API_URL;

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
        const response = await axios.post(`${API_URL}/api/v1/sign-in`, Data);

        setData({ username: "", email: "", password: "", country: "" });

        alert(response.data.message);
        history("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-white">
          Signup
        </div>

        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 text-white px-3 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="username"
          value={Data.username}
          onChange={change}
        />

        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 text-white px-3 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="email"
          value={Data.email}
          required
          onChange={change}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 text-white px-3 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="password"
          value={Data.password}
          onChange={change}
        />

        <input
          type="text"
          placeholder="Country"
          className="bg-gray-700 text-white px-3 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="country"
          value={Data.country}
          onChange={change}
        />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <button
            className="w-full sm:w-auto bg-blue-400 font-semibold text-black px-6 py-2 rounded hover:bg-blue-500 transition-all duration-300"
            onClick={submit}
          >
            Signup
          </button>
          <Link
            to="/login"
            className="text-gray-400 hover:text-gray-200 text-sm sm:text-base"
          >
            Already have an account?{" "}
            <span className="text-blue-400">Login here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
