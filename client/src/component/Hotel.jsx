import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const Hotel = () => {
  const [post, setpost] = useState([]);
  // console.log("All posts", post);
  const handleApi = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setpost(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    handleApi();
  }, []);

  //image rotation logic

  const [imagesIndex, setImageIndexs] = useState({});
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexs((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        post.forEach((num) => {
          const currentindex = newIndexes[num._id] || 0;
          newIndexes[num._id] = (currentindex + 1) % num.images.length;
        });
        return newIndexes;
      });
    }, 4000);
  }, [post]);
  return (
    <div className="container mx-auto mt-16">
      <h2 className="text-3xl font-semibold mb-8 ml-[8rem]">Popular Hotels</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {post.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg overflow-hidden mx-auto w-64"
          >
            <img
              className="object-cover w-full h-64"
              src={hotel.images[imagesIndex[hotel._id] || 0]}
              alt={hotel.name}
            />
            <div className="p-4">
              <Link
                to={`product/${hotel.slug}`}
                className="text-lg font-semibold cursor-pointer"
              >
                {hotel.title}
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hotel;
