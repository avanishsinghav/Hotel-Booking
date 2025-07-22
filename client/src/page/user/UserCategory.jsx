import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Category Images (static demo images)
import Image1 from "../../assets/Post/Rectangle 8.png";
import Image2 from "../../assets/Post/Rectangle 9.png";
import Image3 from "../../assets/Post/Rectangle 10.png";
import Image4 from "../../assets/Post/Rectangle 11.png";

const UserCategory = () => {
  const [category, setCategory] = useState([]);
  const navigation = useNavigate();

  // Fetch all categories from backend
  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(response.data.category);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Static image mapping for demo
  const categoryImages = [
    { name: "Luxury Hotel", image: Image1 },
    { name: "Budget Hotel", image: Image2 },
    { name: "Lodge", image: Image3 },
    { name: "Resort", image: Image4 },
  ];

  // Helper: match image to category name
  const getImageForCategory = (categoryName) => {
    const matched = categoryImages.find((item) => item.name === categoryName);
    return matched ? matched.image : Image1; // fallback image
  };

  return (
    <div className="flex flex-col mt-14 px-4 mx-auto max-w-screen-xl">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Explore by Category
      </h1>

      {/* Category Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {category?.map((destination, index) => {
          const categoryImage = getImageForCategory(destination.name);
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full max-w-sm"
            >
              <div className="relative">
                {categoryImage && (
                  <img
                    src={categoryImage}
                    alt={destination.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                )}
              </div>

              <div className="p-4 text-center">
                <h2
                  className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => navigation(`/category/${destination.slug}`)}
                >
                  {destination.name}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCategory;
