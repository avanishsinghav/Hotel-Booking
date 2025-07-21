import React from "react";
import Image1 from "../assets/Post/Rectangle16.png";
import Image2 from "../assets/Post/Rectangle17.png";
import Image3 from "../assets/Post/Rectangle81.png";

const trips = [
  {
    image: Image1,
    title: "Sydney's 5-Star Hotels",
    description: "Explore Australia's most fashionable hotels...",
  },
  {
    image: Image2,
    title: "Top Vegan Cities",
    description: "Best places for vegan travelers...",
  },
  {
    image: Image3,
    title: "Post-COVID Destinations",
    description: "Safe travel after the pandemic...",
  },
];

const NextTrip = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      <h1 className="text-3xl font-semibold mb-10  ml-[10px]">
        Get Inspiration for Your Next Trip
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="w-full h-[240px] rounded-xl overflow-hidden shadow-lg bg-black/60"
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="mt-[-80px] p-4 bg-black/60 text-white">
              <h2 className="text-lg font-semibold">{trip.title}</h2>
              <p className="text-sm">{trip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextTrip;
