import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Explore the world with My Dream Place
        </h2>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Logo and Description */}
          <div className="flex-shrink-0 w-full md:w-1/4">
            <img src={logo} alt="Logo" className="h-10 mb-3" />
            <p className="text-gray-600">
              Your next go-to companion for travel
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-3/4">
            {/* Company */}
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Advertising
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-semibold mb-3">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Australia
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    New Zealand
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    USA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Greece
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Maldives
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Singapore
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    See more
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold mb-3">Terms & Policies</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Reward System Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-semibold mb-3">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Cancel Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Use Coupon
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Travel Documents
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} My Dream Place. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
