import React, { useState } from "react";
import { FaUser, FaHeart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const issignIn = false;
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setisDropDownOpen((prevstate) => !prevstate);
  };
  const closeDropDown = () => {
    setisDropDownOpen(false);
  };
  const handelRedirect = () => {
    if (auth.user?.role === "admin") {
      navigate("/admin/details");
    } else {
      navigate("/user");
    }
  };
  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged Out Successfully");
    navigate("/");
  };
  return (
    <nav className="flex items-center justify-between p-4 ">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="logo" className="ml-[7em]" />
      </div>

      <div className="hidden md:flex space-x-6">
        <a href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <a href="/hotel" className="text-gray-600 hover:text-gray-900">
          Hotel
        </a>
        <a
          href={
            auth.user?.role === "admin"
              ? "/admin/create-post"
              : "/user/your-order"
          }
          className="text-gray-600 hover:text-gray-900"
        >
          {auth.user?.role === "admin" ? "Add Hotel" : "Booking"}
        </a>
        <a
          href={auth.user?.role === "admin" ? "/admin/create-category" : "/"}
          className="text-gray-600 hover:text-gray-900"
        >
          {auth.user?.role === "admin" ? "Add Category" : "Category"}
        </a>
        <a href="/" className="text-gray-600 hover:text-gray-900">
          About
        </a>
      </div>

      {/*  notofication and profile*/}

      <div className="flex items-center mr-[9rem] relative cursor-pointer gap-4">
        <FaHeart size={23} onClick={() => navigate("/cart")} />
        <FaUser size={20} onClick={handleDropdownToggle} />
        {isDropDownOpen && (
          <div
            className="absolute right-0 mt-36 w-48 bg-white border border-gray-200 rounded shadow-lg z-50"
            onMouseLeave={closeDropDown}
          >
            <ul>
              <li
                onClick={handelRedirect}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Your Profile
              </li>

              {auth.user ? (
                <li
                  onClick={handlelogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Sign Out
                </li>
              ) : (
                <li
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Sign In
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
