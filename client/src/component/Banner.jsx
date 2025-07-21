import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import BannerImage from "../assets/banner.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearch } from "../context/Search";

const Banner = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.keyword) {
      alert("Please enter a keyword to search");
      return;
    }
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/post/search/${
        search.keyword
      }`;
      // console.log(url);
      const data = await axios.get(url);
      setSearch({ ...search, results: data });
      navigate(`/search`);
    } catch (err) {
      console.log("Error:" + err);
    }
  };
  return (
    <div
      className="relative w-full h-[400px] bg-cover bg-center"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Enjoy Your dream vacation
        </h1>
        <p className="text-base sm:text-lg mt-2 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi,
          reiciendis
        </p>
        {/* {search bar} */}
        <div className="mt-8 w-full max-w-[57rem] sm:w-[80%] md:w-[60%] bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-blue-500 bg-white"
            placeholder="Search Destination..."
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
