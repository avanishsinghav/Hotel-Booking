import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaBars,
  FaTimes,
  FaRegUserCircle,
  FaCartPlus,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setUserName(data?.user?.name || "");
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    if (auth?.token) {
      fetchUserDetails();
    }
  }, [auth?.token]);

  const handleDropdownToggle = () => {
    setisDropDownOpen((prevstate) => !prevstate);
  };

  const closeDropDown = () => {
    setisDropDownOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handelRedirect = () => {
    if (auth.user?.role === "admin") {
      navigate("/admin/details");
    } else {
      navigate("/user");
    }
    setisDropDownOpen(false);
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
    setisDropDownOpen(false);
  };

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white relative">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="logo" className="ml-4 h-10" />
      </div>

      {/* Desktop Menu */}
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
          href={
            auth.user?.role === "admin"
              ? "/admin/create-category"
              : "/user/category"
          }
          className="text-gray-600 hover:text-gray-900"
        >
          {auth.user?.role === "admin" ? "Add Category" : "Category"}
        </a>
        <a href="/about" className="text-gray-600 hover:text-gray-900">
          About
        </a>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden mr-4">
        {isMobileMenuOpen ? (
          <FaTimes
            size={24}
            onClick={handleMobileMenuToggle}
            className="cursor-pointer"
          />
        ) : (
          <FaBars
            size={24}
            onClick={handleMobileMenuToggle}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Desktop Cart and User Section */}
      <div className="hidden md:flex items-center gap-6 mr-6 relative">
        {/* Cart Icon */}
        {auth.user?.role !== "admin" && (
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-gray-800"
            onClick={() => navigate("/cart")}
          >
            <FaCartPlus size={22} />
            <span className="text-black-600 text-lg">Cart</span>
          </div>
        )}

        {/* User Profile Section */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-800"
          onClick={handleDropdownToggle}
        >
          <FaRegUserCircle size={22} />
          {userName && (
            <span className="text-gray-700 font-medium">{userName}</span>
          )}
        </div>

        {isDropDownOpen && (
          <div
            className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded shadow-lg z-50"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900"
              onClick={handleMobileMenuToggle}
            >
              Home
            </a>
            <a
              href="/hotel"
              className="text-gray-600 hover:text-gray-900"
              onClick={handleMobileMenuToggle}
            >
              Hotel
            </a>
            <a
              href={
                auth.user?.role === "admin"
                  ? "/admin/create-post"
                  : "/user/your-order"
              }
              className="text-gray-600 hover:text-gray-900"
              onClick={handleMobileMenuToggle}
            >
              {auth.user?.role === "admin" ? "Add Hotel" : "Booking"}
            </a>
            <a
              href={
                auth.user?.role === "admin"
                  ? "/admin/create-category"
                  : "/user/category"
              }
              className="text-gray-600 hover:text-gray-900"
              onClick={handleMobileMenuToggle}
            >
              {auth.user?.role === "admin" ? "Add Category" : "Category"}
            </a>
            <a
              href="/about"
              className="text-gray-600 hover:text-gray-900"
              onClick={handleMobileMenuToggle}
            >
              About
            </a>
            {auth.user?.role !== "admin" && (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate("/cart");
                  setIsMobileMenuOpen(false);
                }}
              >
                <FaCartPlus size={22} />
                <span className="text-gray-600 text-sm">Cart</span>
              </div>
            )}
            <div
              onClick={handleDropdownToggle}
              className="cursor-pointer flex items-center gap-2"
            >
              <FaRegUserCircle size={22} />
              {userName && (
                <span className="text-gray-700 font-medium">{userName}</span>
              )}
            </div>
            {isDropDownOpen && (
              <div
                className="w-48 bg-white border border-gray-200 rounded shadow-lg z-50"
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
