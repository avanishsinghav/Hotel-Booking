import React from "react";
import backgroundImage from "../assets/background.png";
import smartPhone from "../assets/phone.png";

const Advertisment = () => {
  return (
    <div
      className="relative w-[94%] mx-auto h-64 md:h-[16rem] flex items-center justify-center mt-14 "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center max-[45rem]">
        <div className="flex flex-col space-y-4">
          <h2 className="text:xl md:text-2xl font-semibold text-white mt-7">
            download the Mobile Application for bonus <br /> coupons and travel
            codes
          </h2>
          <button className="w-45 py-2 bg-blue-600 text-white rounded-md font-semibold">
            Download The App
          </button>
        </div>
        <img
          src={smartPhone}
          alt="samrtpone"
          className="hidden md:block w-[45rem] pobject-contain"
        />
      </div>
    </div>
  );
};

export default Advertisment;
