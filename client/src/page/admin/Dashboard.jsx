import React from "react";
import Navbar from "./Navbar";
import Details from "./Details";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-start p-10 bg-gray-50 min-h-screen">
      <div className="flex shadow-lg rounded-lg overflow-hidden bg-white min-h-[28rem] w-[82rem]">
        <Navbar />
        <Details />
      </div>
    </div>
  );
};

export default Dashboard;
