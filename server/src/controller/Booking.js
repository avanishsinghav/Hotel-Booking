import Stripe from "stripe";
import BookingModel from "../models/Booking.js";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
// import BookingModel from "../models/Booking.js";

const stripe = "";

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, description, customerName, customerAddress } =
      req.body;

    if (
      !amount ||
      !currency ||
      !description ||
      !customerName ||
      !customerAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "All values are required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      description,
      shipping: {
        name: customerName,
        address: {
          line1: customerAddress.line1,
          city: customerAddress.city,
          state: customerAddress.state,
          postal_code: customerAddress.postalCode, // Fix typo here too
          country: customerAddress.country,
        },
      },
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create payment intent",
      error: err.message,
    });
  }
};

export const updatePatmentAvailability = async (req, res) => {
  const { postId, isAvailable } = req.body;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "invalid post Id" });
  }
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { isAvailable },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ sucess: true, post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      sucess: false,
      message: "Failed to update payment intent",
      error: err.message,
    });
  }
};

export const createBookings = async (req, res) => {
  try {
    const { token, postId, bookingDate, transactionId } = req.body;
    // console.log("token", postId, bookingDate, transitionID);
    if (!token || !postId || !bookingDate || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "All field Are required",
      });
    }
    // decode token from user
    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expire token",
      });
    }

    // use the decode userid from token

    const userId = decode.id;
    const userExists = await UserModel.findById(userId);
    if (!userExists) {
      return res.status(400).send({
        success: false,
        message: "user not found",
      });
    }

    // validate post existance

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).send({
        success: false,
        message: "Post not found",
      });
    }

    // create a new booking
    const booking = new BookingModel({
      user: userId,
      post: postId,
      bookingDate,
      transactionId,
      paymentStatus: "paid",
    });

    const savedBooking = await booking.save();
    return res.status(200).send({
      success: true,
      message: "booking create successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      sucess: false,
      message: "Failed to create Booking",
      error: err.message,
    });
  }
};
