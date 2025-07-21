import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, SetError] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setemail("");
    setpassword("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password }
      );
      toast.success("Login Successfully");
      setAuth({
        ...auth,
        user: response.data?.user,
        token: response.data?.token,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      SetError(error.response.data.error);
      toast.error("Login failed please try again");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 pt-10 pb-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <label className="black text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="black text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="mt-2 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded "
              />
              <span className="ml-2 text-sm text-gray-700">
                keep me signed in
              </span>
            </label>
            <a href="" className="text-sm text-indigo-600 hover:underline">
              Forget Password
            </a>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-3"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-700">
          Don't have an account{"   "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
