import React, { useEffect, useState } from "react";
import {
  FaWifi,
  FaBriefcase,
  FaSwimmingPool,
  FaCar,
  FaStar,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import Spinner from "../Spinner";
import RelatedPost from "./RelatedPost";
import { useNavigate, useParams } from "react-router-dom";
import { usecart } from "../../context/Cart";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState(null);
  const [relatedPost, setrelatedPost] = useState([]);
  const [cart, setcart] = usecart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [auth] = useAuth();
  console.log(postDetails);

  const handleCheckIn = () => {
    if (!auth?.token) {
      toast.error("Please login to continue");
      return navigate("/Login");
    }
    navigate("/payment", {
      state: {
        price: postDetails?.price,
        product: postDetails?.title,
        postId: postDetails?._id,
      },
    });
  };

  const handlePostDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`
      );
      const post = response.data.post;
      setPostDetails(post);
      getRelatedPost(post?._id, post?.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const getRelatedPost = async (pid, cid) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/related-post/${pid}/${cid}`
      );
      setrelatedPost(response.data.relatedPost);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handlePostDetails();
  }, [params.slug]);

  useEffect(() => {
    if (postDetails) {
      const found = cart.some((item) => item._id === postDetails._id);
      setIsAddedToCart(found);
    }
  }, [cart, postDetails]);

  const handleAddtocart = () => {
    if (postDetails.isAvailable && !isAddedToCart) {
      const updatedCart = [...cart, postDetails];
      setcart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Room added to cart successfully");
      setIsAddedToCart(true);
    }
  };

  if (!postDetails) return <Spinner />;

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:space-x-8 overflow-hidden">
        <div className="flex flex-col space-y-4 p-4 md:w-1/2">
          {postDetails?.images.length > 0 && (
            <>
              <img
                src={postDetails?.images[0]}
                alt="Main images"
                className="w-full h-[25rem] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
              <div className="grid grid-cols-2 gap-6">
                {postDetails.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Additional Image ${idx + 1}`}
                    className="w-full h-[25rem] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="flex-1 p-8 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {postDetails?.title}
          </h1>
          <div className="flex items-center space-x-2 text-yellow-500 mb-4">
            <FaStar />
            <span className="text-xl font-semibold">4.5</span>
            <span className="text-gray-500">(1200 Reviews)</span>
          </div>
          <p className="flex items-center text-gray-600 mb-4">
            <MdLocationOn className="text-xl" />
            {postDetails?.hotelLocation || "Location unavailable"}
          </p>
          <div className="flex space-x-4 mb-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleCheckIn}
            >
              Check-in
            </button>
            <button
              className={`px-4 py-2 rounded ${
                postDetails.isAvailable && !isAddedToCart
                  ? "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
                  : "bg-gray-300 text-black cursor-not-allowed"
              }`}
              disabled={!postDetails.isAvailable || isAddedToCart}
              onClick={handleAddtocart}
            >
              {isAddedToCart ? "Added" : "Add to Wishlist"}
            </button>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            <p className="text-gray-600 mt-2">{postDetails?.description}</p>
          </div>
          <div className="mt-3">
            <p className="text-base font-bold text-orange-600">
              Price PerDay:{" "}
              <span className="text-xl text-gray-500">
                {postDetails?.price.toLocaleString("en-us", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            {/* Nearby Areas */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800">Near Area</h2>
              <ul className="space-y-2 mt-2 text-gray-700 list-disc pl-5">
                {postDetails?.nearArea?.flatMap((area, idx) =>
                  area
                    .split(",")
                    .map((subArea, subIdx) => (
                      <li key={`${idx}-${subIdx}`}>{subArea.trim()}</li>
                    ))
                )}
              </ul>
            </div>
            {/* Facilities */}
            <div className="mt-8 mr-32">
              <h2 className="text-xl font-semibold text-gray-800">
                Facilities
              </h2>
              <ul className="space-y-2 mt-2 text-gray-700 list-disc pl-5">
                {postDetails?.facilities?.flatMap((facility, idx) =>
                  facility
                    .split(",")
                    .map((subFacility, subIdx) => (
                      <li key={`${idx}-${subIdx}`}>{subFacility.trim()}</li>
                    ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <h1 className="ml-11 font-semibold text-3xl mb-7 mt-5">
        You May Also Like This:
      </h1>
      <RelatedPost relatedProducts={relatedPost} />
    </div>
  );
};

export default Product;
