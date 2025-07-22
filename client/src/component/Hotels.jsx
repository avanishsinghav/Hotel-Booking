import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [post, setPost] = useState([]);
  const [imagesIndex, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleApi = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPost(response.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load hotels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        post.forEach((hotel) => {
          const currentIndex = newIndexes[hotel._id] || 0;
          newIndexes[hotel._id] =
            hotel.images?.length > 0
              ? (currentIndex + 1) % hotel.images.length
              : 0;
        });
        return newIndexes;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [post]);

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="w-full flex justify-center">
        <h2 className="text-4xl font-bold text-gray-900 tracking-wide inline-block px-6 py-2 rounded-md">
          Discover Your Dream Stay ✨
        </h2>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading hotels...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && post.length === 0 && (
        <p className="text-center text-gray-500">No hotels available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {post.map((hotel) => (
          <Link
            to={`/product/${hotel.slug}`}
            key={hotel._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition block"
          >
            <img
              className="w-full h-48 object-cover rounded-md mb-3"
              src={
                hotel.images?.[imagesIndex[hotel._id] || 0] ||
                "/placeholder.png"
              }
              alt={hotel.title}
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {hotel.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {hotel.description?.length > 60
                ? `${hotel.description.slice(0, 60)}...`
                : hotel.description}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Location:</span>{" "}
              {hotel.hotelLocation || "Unknown"}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Price:</span> ₹{hotel.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
