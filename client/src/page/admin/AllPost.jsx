import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Left sidebar
import axios from "axios";

const AllPost = () => {
  const [postdata, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAPI = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPostData(response.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAPI();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="mt-20 w-64 shadow h-full">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          All Posts
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading posts...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && postdata.length === 0 && (
          <p className="text-center text-gray-500">No posts available.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {postdata.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={post.images?.[0] || "/placeholder.png"}
                alt={post.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />

              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {post.title}
              </h3>

              <p className="text-sm text-gray-600 mb-2">
                {post.description?.length > 80
                  ? `${post.description.slice(0, 80)}...`
                  : post.description}
              </p>

              <p className="text-sm text-gray-700">
                <span className="font-medium">Location:</span>{" "}
                {post.hotelLocation || "Unknown"}
              </p>

              <p className="text-sm text-gray-700">
                <span className="font-medium">Guests:</span> {post.guest}
              </p>

              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Price:</span> ₹{post.price}
              </p>

              {post.facilities?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.facilities.map((f, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
