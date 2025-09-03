import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    history("/");
  }

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://task-backend-tan.vercel.app/api/v1/sign-in", // ✅ changed to sign-in
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="p-6 sm:p-8 w-full sm:w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3 rounded-2xl bg-gray-800 shadow-lg">
        <div className="text-2xl font-semibold text-white text-center mb-6">
          Login
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

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-2 mb-6 w-full rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="password"
          value={Data.password}
          onChange={change}
        />

        {/* Buttons & Link */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            className="bg-blue-400 hover:bg-blue-500 font-semibold text-black px-4 py-2 w-full sm:w-auto rounded-lg transition"
            onClick={submit}
          >
            Login
          </button>

          <Link
            to="/signup"
            className="text-gray-400 hover:text-gray-200 text-sm sm:text-base"
          >
            Not having an account? Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
