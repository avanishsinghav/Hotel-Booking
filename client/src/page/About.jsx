import React from "react";
import Abouts from "../assets/About-section.png";

const About = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        About Us
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Learn more about our mission, values, and the people behind the project.
      </p>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Image or Illustration */}
        <img src={Abouts} alt="About us" className="rounded-xl shadow-md" />

        {/* Right Text */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are passionate about connecting travelers with the perfect places
            to stay. Whether you're looking for a luxury resort, a budget hotel,
            or a cozy lodge, our platform helps you discover and book top-rated
            accommodations across the world.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to simplify travel planning and enhance your
            experience by offering a seamless, secure, and trustworthy hotel
            booking service. We strive to provide users with real-time
            availability, role-based features, and rich hotel data for easy
            decision-making.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
