import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) history("/");
  }, [isLoggedIn, history]);

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
      if (!Data.username || !Data.email || !Data.password || !Data.country) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "https://task-backend-tan.vercel.app/api/v1/sign-in",
        Data
      );

      setData({ username: "", email: "", password: "", country: "" });
      alert(response.data.message);
      history("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center bg-gray-950 p-2">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Signup</h2>

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={Data.username}
          onChange={change}
          autoComplete="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white placeholder-gray-400"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={Data.email}
          onChange={change}
          autoComplete="email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={Data.password}
          onChange={change}
          autoComplete="new-password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white placeholder-gray-400"
        />

        <input
          type="text"
          placeholder="Country"
          name="country"
          value={Data.country}
          onChange={change}
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white placeholder-gray-400"
        />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
          <button
            className="bg-blue-400 font-semibold text-black px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-500 transition-colors"
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
