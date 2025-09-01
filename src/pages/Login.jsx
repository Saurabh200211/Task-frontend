import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) history("/");
  }, [isLoggedIn, history]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "https://task-backend-tan.vercel.app/api/v1/log-in",
        Data
      );

      setData({ username: "", password: "" });
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      history("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center bg-gray-950 p-2">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white placeholder-gray-400"
          name="username"
          value={Data.username}
          onChange={change}
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white placeholder-gray-400"
          name="password"
          value={Data.password}
          onChange={change}
          autoComplete="current-password"
        />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
          <button
            className="bg-blue-400 font-semibold text-black px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-500 transition-colors"
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
