import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hotelLocation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, "You must provide at leasst 3 images"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: true,
  },
  guest: {
    type: Number,
    reqquired: true,
  },
  price: {
    type: Number,
    required: true,
    min: 100,
    max: 5000,
  },
  nearArea: {
    type: [String],
    required: true,
  },
  facilities: {
    type: [String],
    lowercase: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

function arrayLimit(val) {
  return val.length === 3;
}

export default mongoose.model("Post", postSchema);
