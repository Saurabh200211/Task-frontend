import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    history("/");
  }

  const API_URL = process.env.REACT_APP_API_URL;

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(`${API_URL}/api/v1/sign-in`, Data);

        setData({ username: "", password: "" });

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);

        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-white">
          Login
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
          type="password"
          placeholder="Password"
          className="bg-gray-700 text-white px-3 py-2 my-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          name="password"
          value={Data.password}
          onChange={change}
        />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <button
            className="w-full sm:w-auto bg-blue-400 font-semibold text-black px-6 py-2 rounded hover:bg-blue-500 transition-all duration-300"
            onClick={submit}
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-gray-400 hover:text-gray-200 text-sm sm:text-base"
          >
            Not having an account? <span className="text-blue-400">Signup here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
